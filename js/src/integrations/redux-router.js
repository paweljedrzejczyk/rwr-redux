import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import ReduxStore from './redux-store';

class ReduxRouter {
  constructor() {
    this.routes = {};
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

  get integrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        const { name, storeName } = payload;
        this.renderRouter(node, name, storeName);
      }.bind(this),

      unmount: function _unmount(node) {
        this.unmountRouter(node);
      }.bind(this),

      nodeRun: function _nodeRun() {

      }.bind(this),
    };
  }
}

export default new ReduxRouter;
