import expect, { spyOn } from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';

import subject from '../../src/integrations/redux-router';

class App extends React.Component {
  render() {
    return <div>App</div>;
  }
}

const routes = (<Route path="/" component={App} />);

describe('ReduxRouter', function () {
  afterEach(function () {
    subject.routes = {};
    expect.restoreSpies();
  });

  describe('.constructor', function () {
    it('initialize empty routes object', function () {
      expect(subject.routes).toEqual({});
    });
  });

  describe('#registerRoutes', function () {
    it('adds routes to the storage', function () {
      subject.registerRoutes('RoutesName', routes);

      expect(subject.routes.RoutesName).toEqual(routes);
    });
  });

  describe('#getRoutes', function () {
    it('returns routes by name', function () {
      subject.registerRoutes('RoutesName', routes);

      expect(subject.getRoutes('RoutesName')).toEqual(routes);
    });
  });

  describe('#createRootRouter', function () {
    it('calls syncHistoryWithStore and createElement', function () {
      // TODO
    });
  });

  describe('#unmountRouter', function () {
    it('calls #unmountComponentAtNode', function () {
      const node = { nodeType: 1, nodeName: 'DIV' };
      const unmountSpy = spyOn(ReactDOM, 'unmountComponentAtNode');

      subject.unmountRouter(node);

      expect(unmountSpy.calls.length).toEqual(1);
      expect(unmountSpy).toHaveBeenCalledWith(node);
    });
  });

  describe('#renderRouter', function () {
    it('calls createRootRouter and render functions', function () {
      const subjectSpy = spyOn(subject, 'createRootRouter').andReturn('router');
      const reactSpy = spyOn(ReactDOM, 'render');

      subject.renderRouter('node', 'RouterName', 'StoreName');

      expect(subjectSpy.calls.length).toEqual(1);
      expect(subjectSpy).toHaveBeenCalledWith('RouterName', 'StoreName');
      expect(reactSpy.calls.length).toEqual(1);
      expect(reactSpy).toHaveBeenCalledWith('router', 'node');
    });
  });

  describe('#renderContainerToString', function () {
    // TODO
  });

  describe('#integrationWrapper', function () {
    const node = { nodeType: 1, nodeName: 'DIV' };
    const payload = { name: 'RouterName', storeName: 'StoreName', path: '/path' };

    describe('#mount', function () {
      it('calls #renderRouter', function () {
        const { name, storeName } = payload;
        const mountSpy = spyOn(subject, 'renderRouter');
        subject.integrationWrapper.mount(node, payload);

        expect(mountSpy.calls.length).toEqual(1);
        expect(mountSpy).toHaveBeenCalledWith(node, name, storeName);
      });
    });

    describe('#unmount', function () {
      it('calls #unmountRouter', function () {
        const unmountSpy = spyOn(subject, 'unmountRouter');
        subject.integrationWrapper.unmount(node);

        expect(unmountSpy.calls.length).toEqual(1);
        expect(unmountSpy).toHaveBeenCalledWith(node);
      });
    });

    describe('#nodeRun', function () {
      it('calls #renderRouterToString', function () {
        const { name, storeName, path } = payload;
        const nodeRunSpy = spyOn(subject, 'renderRouterToString');
        subject.integrationWrapper.nodeRun(payload);

        expect(nodeRunSpy.calls.length).toEqual(1);
        expect(nodeRunSpy).toHaveBeenCalledWith(name, storeName, path);
      });
    });
  });
});
