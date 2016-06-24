import React from 'react';
import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, match, RouterContext, createMemoryHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import ReduxStore from './redux-store';

class ReduxRouter {
  constructor() {
    this.routes = {};

    this.registerRoutes = this.registerRoutes.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.createRootRouter = this.createRootRouter.bind(this);
    this.unmountRouter = this.unmountRouter.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
    this.renderRouterToString = this.renderRouterToString.bind(this);
  }

  registerRoutes(name, routes) {
    this.routes[name] = routes;
  }

  getRoutes(name) {
    return this.routes[name];
  }

  createRootRouter(name, storeName) {
    const routes = this.getRoutes(name);
    const store = ReduxStore.getStore(storeName);
    const history = syncHistoryWithStore(browserHistory, store);

    return createElement(Provider, { store },
      createElement(Router, { history }, routes)
    );
  }

  unmountRouter(node) {
    unmountComponentAtNode(node);
  }

  renderRouter(node, name, storeName) {
    const rootRouter = this.createRootRouter(name, storeName);
    render(rootRouter, node);
  }

  renderRouterToString(name, storeName, path) {
    const routes = this.getRoutes(name);
    const memoryHistory = createMemoryHistory(path);
    const store = ReduxStore.getStore(storeName);
    const history = syncHistoryWithStore(memoryHistory, store);

    const result = {
      body: '',
      code: 0,
    };

    match({ history, routes, location: path }, (error, redirectLocation, renderProps) => {
      if (error) {
        throw error;
      } else if (redirectLocation) {
        result.code = 302;
        result.redirectUri = `${redirectLocation.pathname}${redirectLocation.search}`;
      } else if (renderProps) {
        result.body = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps}/>
          </Provider>
        );
        result.code = 200;
      } else {
        result.code = 404;
      }
    });

    return JSON.stringify(result);
  }

  get integrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        const { name, storeName } = payload;
        this.renderRouter(node, name, storeName);
      }.bind(this),

      unmount: function _unmount(node) {
        this.unmountRouter(node);
      }.bind(this),

      nodeRun: function _nodeRun(payload) {
        const { name, storeName, path } = payload;
        return this.renderRouterToString(name, storeName, path);
      }.bind(this),
    };
  }
}

export default new ReduxRouter;
