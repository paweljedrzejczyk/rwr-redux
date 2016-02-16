import RWR , {integrationsManager} from 'react-webpack-rails';
import RWRRedux from 'rwr-redux';

RWR.run();

integrationsManager.register('redux-store', RWRRedux.storeIntegrationWrapper);
integrationsManager.register('redux-container', RWRRedux.containerIntegrationWrapper);

import Store from './store';
RWRRedux.registerStore('MyStore', Store);

import DevTools from './containers/DevTools';
RWRRedux.registerContainer('DevTools', DevTools);

import CounterApp from './containers/App';
RWRRedux.registerContainer('CounterApp', CounterApp);
