import RWR, { integrationsManager } from 'react-webpack-rails';
import RWRRedux from 'rwr-redux';

import Store from './store';
import DevTools from './containers/DevTools';
import CounterApp from './containers/CounterApp';
import CounterRoutes from './routes';
import ServerSideRoutes from './routes/ServerSideRoutes';

RWR.run();

integrationsManager.register('redux-store', RWRRedux.storeIntegrationWrapper);
integrationsManager.register('redux-container', RWRRedux.containerIntegrationWrapper);
integrationsManager.register('redux-router', RWRRedux.routerIntegrationWrapper);

RWRRedux.registerStore('MyStore', Store);

RWRRedux.registerContainer('DevTools', DevTools);
RWRRedux.registerContainer('CounterApp', CounterApp);

RWRRedux.registerRoutes('CounterRoutes', CounterRoutes);
RWRRedux.registerRoutes('ServerSideRoutes', ServerSideRoutes);
