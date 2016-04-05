import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Route, Redirect } from 'react-router';
import { routerReducer } from 'react-router-redux';

import ReduxStore from '../../src/integrations/redux-store';

class AppComponent extends React.Component {
  render() {
    return <div>App Component</div>;
  }
}

const routes = (
  <Route path="/" component={AppComponent}>
    <Redirect from="home" to="/" />
  </Route>
);

const fakeReducer = combineReducers({ routing: routerReducer });
const store = function (initialState) {
  return createStore(fakeReducer, initialState);
};

const registerRoutesAndMountStore = (subject) => {
  subject.registerRoutes('RoutesName', routes);
  ReduxStore.registerStore('StoreName', store);
  ReduxStore.mountStore('StoreName', {});
};

export {
  routes,
  registerRoutesAndMountStore,
};
