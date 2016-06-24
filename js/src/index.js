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
    this.getContainer = ReduxContainer.getContainer;
    this.createContainer = ReduxContainer.createContainer;
    this.createRootComponent = ReduxContainer.createRootComponent;
    this.renderContainer = ReduxContainer.renderContainer;
    this.unmountContainer = ReduxContainer.unmountContainer;
    this.renderContainerToString = ReduxContainer.renderContainerToString;
    this.containerIntegrationWrapper = ReduxContainer.integrationWrapper;

    this.registerRoutes = ReduxRouter.registerRoutes;
    this.getRoutes = ReduxRouter.getRoutes;
    this.createRootRouter = ReduxRouter.createRootRouter;
    this.unmountRouter = ReduxRouter.unmountRouter;
    this.renderRouter = ReduxRouter.renderRouter;
    this.renderRouterToString = ReduxRouter.renderRouterToString;
    this.routerIntegrationWrapper = ReduxRouter.integrationWrapper;
  }
}

export default new RWRRedux;
