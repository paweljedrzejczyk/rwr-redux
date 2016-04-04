import expect, { spyOn } from 'expect';
import React from 'react';
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
    });
  });

  describe('#unmountRouter', function () {});

  describe('#renderRouter', function () {});

  describe('#renderContainerToString', function () {});

  describe('#integrationWrapper', function () {
    describe('#mount', function () {});

    describe('#unmount', function () {});

    describe('#nodeRun', function () {});
  });
});
