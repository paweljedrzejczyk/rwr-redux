import RWR, { integrationsManager } from 'react-webpack-rails';
import RWRRedux from 'rwr-redux';

RWR.run();

integrationsManager.register('redux-store', RWRRedux.storeIntegrationWrapper);
integrationsManager.register('redux-container', RWRRedux.containerIntegrationWrapper);
integrationsManager.register('redux-router', RWRRedux.routerIntegrationWrapper);

import Store from './store';
RWRRedux.registerStore('MyStore', Store);

import DevTools from './containers/DevTools';
RWRRedux.registerContainer('DevTools', DevTools);

import CounterApp from './containers/CounterApp';
RWRRedux.registerContainer('CounterApp', CounterApp);

import CounterRoutes from './routes';
RWRRedux.registerRoutes('CounterRoutes', CounterRoutes);

import ServerSideRoutes from './routes/ServerSideRoutes';
RWRRedux.registerRoutes('ServerSideRoutes', ServerSideRoutes);
