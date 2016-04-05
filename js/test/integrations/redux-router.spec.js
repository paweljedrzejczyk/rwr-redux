import expect, { spyOn } from 'expect';
import ReactDOM from 'react-dom';

import subject from '../../src/integrations/redux-router';
import { routes, registerRoutesAndMountStore } from '../helpers/redux-router';

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

  describe('#renderRouterToString', function () {
    const renderRouterToString = (path) => {
      const result = subject.renderRouterToString('RoutesName', 'StoreName', path);
      return JSON.parse(result);
    };

    beforeEach(function () {
      registerRoutesAndMountStore(subject);
    });

    context('when router can match location', function () {
      it('returns string component and 200 status code', function () {
        const validPath = '/';
        const result = renderRouterToString(validPath);

        expect(result.code).toEqual(200);
        expect(result.body).toInclude('App Component');
      });
    });

    context('when router returns redirectLocation', function () {
      it('returns 302 status code and redirectUri', function () {
        const redirectPath = '/home';
        const result = renderRouterToString(redirectPath);

        expect(result.code).toEqual(302);
        expect(result.body).toEqual('');
        expect(result.redirectUri).toEqual('/');
      });
    });

    context('when router can not match location', function () {
      it('returns 404 status code', function () {
        const invalidPath = '/path';
        const result = renderRouterToString(invalidPath);

        expect(result.code).toEqual(404);
        expect(result.body).toEqual('');
      });
    });
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
