import { createElement } from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { renderToString } from 'react-dom/server';

import ReduxStore from './redux-store';

class ReduxContainer {
  constructor() {
    this.containers = {};

    this.registerContainer = this.registerContainer.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.createRootComponent = this.createRootComponent.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
    this.unmountContainer = this.unmountContainer.bind(this);
    this.renderContainerToString = this.renderContainerToString.bind(this);
  }

  registerContainer(name, container) {
    this.containers[name] = container;
  }

  getContainer(name) {
    return this.containers[name];
  }

  createContainer(name, props) {
    const constructor = this.getContainer(name);
    return createElement(constructor, props);
  }

  createRootComponent(name, { props, storeName }) {
    const container = this.createContainer(name, props);
    const store = ReduxStore.getStore(storeName);

    return createElement(Provider, { store }, container);
  }

  renderContainer(name, payload, node) {
    const rootComponent = this.createRootComponent(name, payload);
    render(rootComponent, node);
  }

  unmountContainer(node) {
    unmountComponentAtNode(node);
  }

  renderContainerToString(name, storeName) {
    const rootComponent = this.createRootComponent(name, storeName);
    const result = renderToString(rootComponent);

    return JSON.stringify({ body: result });
  }

  get integrationWrapper() {
    return {
      mount: function _mount(node, payload) {
        this.renderContainer(payload.name, payload, node);
      }.bind(this),

      unmount: function _unmount(node) {
        this.unmountContainer(node);
      }.bind(this),

      nodeRun: function _prerender(payload) {
        const { name, storeName } = payload;
        return this.renderContainerToString(name, storeName);
      }.bind(this),
    };
  }
}

export default new ReduxContainer;
