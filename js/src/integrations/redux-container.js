import { createElement } from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';

import ReduxStore from './redux-store';

class ReduxContainer {
  constructor() {
    this.containers = {};

    this.registerContainer = this.registerContainer.bind(this);
  }

  registerContainer(name, container) {
    this.containers[name] = container;
  }

  getContainer(name) {
    return this.containers[name];
  }

  createContainer(name) {
    const constructor = this.getContainer(name);
    return createElement(constructor);
  }

  createRootComponent(name, storeName) {
    const container = this.createContainer(name);
    const store = ReduxStore.getStore(storeName);

    return createElement(Provider, { store }, container);
  }

  renderContainer(name, node, storeName) {
    const rootComponent = this.createRootComponent(name, storeName);
    render(rootComponent, node);
  }

  unmountContainer(node) {
    unmountComponentAtNode(node);
  }

  get integrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.renderContainer(payload.name, node, payload.storeName);
      }.bind(this),

      unmount: function _unmount(node) {
        this.unmountContainer(node);
      }.bind(this),
    };
  }
}

export default new ReduxContainer;
