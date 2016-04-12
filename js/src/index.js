import version from './version';
import ReduxStore from './integrations/redux-store';
import ReduxContainer from './integrations/redux-container';
import ReduxRouter from './integrations/redux-router';

class RWRRedux {
  constructor() {
    this.version = version;

    this.registerStore = ReduxStore.registerStore;
    this.mountStore = ReduxStore.mountStore;
    this.getStore = ReduxStore.getStore;
    this.storeIntegrationWrapper = ReduxStore.integrationWrapper;

    this.registerContainer = ReduxContainer.registerContainer;
    this.containerIntegrationWrapper = ReduxContainer.integrationWrapper;

    this.registerRoutes = ReduxRouter.registerRoutes;
    this.routerIntegrationWrapper = ReduxRouter.integrationWrapper;
  }
}

export default new RWRRedux;
