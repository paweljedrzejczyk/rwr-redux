import { isFunction, isReduxStore } from '../utils/validators';

class ReduxStore {
  constructor() {
    this.registeredStores = {};
    this.mountedStores = {};
    this.defaultStore = null;

    this.registerStore = this.registerStore.bind(this);
    this.getStore = this.getStore.bind(this);
    this.mountStore = this.mountStore.bind(this);
  }

  registerStore(name, store) {
    isFunction(store, `Error when registering '${name}' store: must be a function.`);
    this.registeredStores[name] = store;
  }

  mountStore(name, props) {
    const store = this.registeredStores[name];
    isFunction(store, `Error when mounting '${name}' store: must be a function.`);

    const storeObject = store(props);
    isReduxStore(storeObject, `Error when mounting '${name}' store: must be a valid Redux store.`);
    this.mountedStores[name] = storeObject;
    this.defaultStore = storeObject;
  }

  getStore(name) {
    if (name) {
      return this.mountedStores[name];
    }

    return this.defaultStore;
  }

  get integrationWrapper() {
    return {
      mount: function _mount(_, payload) {
        this.mountStore(payload.name, payload.props);
      }.bind(this),

      nodeRun: function _mount(payload) {
        this.mountStore(payload.name, payload.props);
      }.bind(this),
    };
  }
}

export default new ReduxStore;
