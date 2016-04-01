import version from './version';
import ReduxStore from './integrations/redux-store';
import ReduxContainer from './integrations/redux-container';
import ReduxRouter from './integrations/redux-router';

class RWRRedux {
  constructor() {
    this.version = version;

    this.registerStore = ReduxStore.registerStore;
    this.registerContainer = ReduxContainer.registerContainer;
    this.registerRoutes = ReduxRouter.registerRoutes;

    this.storeIntegrationWrapper = ReduxStore.integrationWrapper;
    this.containerIntegrationWrapper = ReduxContainer.integrationWrapper;
    this.routerIntegrationWrapper = ReduxRouter.integrationWrapper;
  }
}

export default new RWRRedux;
