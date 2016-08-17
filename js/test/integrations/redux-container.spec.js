import expect, { spyOn } from 'expect';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import subject from '../../src/integrations/redux-container';
import ReduxStore from '../../src/integrations/redux-store';

class AppContainer extends React.Component {
  render() {
    return <div>AppContainer</div>;
  }
}

const fakeReducer = function () {};
const store = function (initialState) {
  return createStore(fakeReducer, initialState);
};

function resetConstructor() {
  subject.containers = {};
  expect.restoreSpies();
}

describe('ReduxContainer', function () {
  before(function () {
    resetConstructor();
  });

  afterEach(function () {
    resetConstructor();
  });

  describe('.constructor', function () {
    it('initialize empty containers object', function () {
      expect(subject.containers).toEqual({});
    });
  });

  describe('#registerContainer', function () {
    it('adds container to the storage', function () {
      subject.registerContainer('AppContainer', AppContainer);

      expect(subject.containers.AppContainer).toEqual(AppContainer);
    });
  });

  describe('#getContainer', function () {
    it('returns container by name', function () {
      subject.registerContainer('AppContainer', AppContainer);

      expect(subject.getContainer('AppContainer')).toEqual(AppContainer);
    });
  });

  describe('#createContainer', function () {
    it('creates redux container', function () {
      subject.registerContainer('AppContainer', AppContainer);
      const container = subject.createContainer('AppContainer', { points: 2 });

      expect(React.isValidElement(container)).toBe(true);
      expect(container.type).toBe(AppContainer);
    });
  });

  describe('#createRootComponent', function () {
    it('creates redux root component', function () {
      const initialState = { fake: 'state' };
      const payload = {
        name: 'ContainerName',
        props: { points: 2 },
        storeName: 'StoreName',
      };

      ReduxStore.registerStore('StoreName', store);
      ReduxStore.mountStore('StoreName', initialState);

      subject.registerContainer('AppContainer', AppContainer);
      const rootComponent = subject.createRootComponent(
          payload.name, payload);

      expect(React.isValidElement(rootComponent)).toBe(true);
    });
  });

  describe('#renderContainer', function () {
    it('calls #createRootComponent and ReactDOM.render functions', function () {
      const subjectSpy = spyOn(subject, 'createRootComponent');
      const reactSpy = spyOn(ReactDOM, 'render');
      const payload = {
        name: 'ContainerName',
        props: { points: 2 },
        storeName: 'StoreName',
      };

      subject.renderContainer(payload.name, payload, 'node');

      expect(subjectSpy.calls.length).toEqual(1);
      expect(subjectSpy).toHaveBeenCalledWith(payload.name, payload);
      expect(reactSpy.calls.length).toEqual(1);
    });
  });

  describe('#unmountContainer', function () {
    it('calls #unmountComponentAtNode', function () {
      const node = { nodeType: 1, nodeName: 'DIV' };
      const unmountSpy = spyOn(ReactDOM, 'unmountComponentAtNode');

      subject.unmountContainer(node);

      expect(unmountSpy.calls.length).toEqual(1);
      expect(unmountSpy).toHaveBeenCalledWith(node);
    });
  });

  describe('#renderContainerToString', function () {
    it('calls #createRootComponent and ReactDOM.renderToString', function () {
      const subjectSpy = spyOn(subject, 'createRootComponent');
      const reactSpy = spyOn(ReactDOMServer, 'renderToString');
      const payload = {
        name: 'ContainerName',
        props: { points: 2 },
        storeName: 'StoreName',
      };

      subject.renderContainerToString(payload.name, payload);

      expect(subjectSpy.calls.length).toEqual(1);
      expect(subjectSpy).toHaveBeenCalledWith(payload.name, payload);
      expect(reactSpy.calls.length).toEqual(1);
    });

    it('returns JSON.stringify result', function () {
      const initialState = { fake: 'state' };
      ReduxStore.registerStore('StoreName', store);
      ReduxStore.mountStore('StoreName', initialState);
      subject.registerContainer('AppContainer', AppContainer);

      const result = subject.renderContainerToString('AppContainer', 'StoreName');

      expect(JSON.parse(result).body).toNotEqual(null);
    });
  });

  describe('#integrationWrapper', function () {
    const node = { nodeType: 1, nodeName: 'DIV' };
    const payload = {
      name: 'ContainerName',
      props: { points: 2 },
      storeName: 'StoreName',
    };

    describe('mount', function () {
      it('calls #renderContainer', function () {
        const mountSpy = spyOn(subject, 'renderContainer');
        subject.integrationWrapper.mount(node, payload);

        expect(mountSpy.calls.length).toEqual(1);
        expect(mountSpy).toHaveBeenCalledWith(payload.name, payload, node);
      });
    });

    describe('unmount', function () {
      it('calls #unmountContainer', function () {
        const unmountSpy = spyOn(subject, 'unmountContainer');
        subject.integrationWrapper.unmount(node);

        expect(unmountSpy.calls.length).toEqual(1);
        expect(unmountSpy).toHaveBeenCalledWith(node);
      });
    });

    describe('nodeRun', function () {
      it('calls #renderContainerToString', function () {
        const nodeRunSpy = spyOn(subject, 'renderContainerToString');
        subject.integrationWrapper.nodeRun(payload);

        expect(nodeRunSpy.calls.length).toEqual(1);
        expect(nodeRunSpy).toHaveBeenCalledWith(payload.name, payload);
      });
    });
  });
});
