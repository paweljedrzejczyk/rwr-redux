# react-router-redux in Rails app

Adding multiple Redux components within Rails view is really easy thanks to [react_webpack_rails](https://github.com/netguru/react_webpack_rails) and [rwr-redux](https://github.com/netguru/rwr-redux).

This guide shows how to do routing with `react-router` and how to sync state between components with Redux store using `react-router-redux`.
Let's say you would like to have two components which shares the same store, navbar and main app component.

If you want check the source code right away, you can find example app [here](https://github.com/caspg/rails-react-examples/tree/master/redux-router).

## Setup

* [react_webpack_rails](https://github.com/netguru/react_webpack_rails) and [rwr-redux](https://github.com/netguru/rwr-redux) have to be added to your app
* install react-router and react-router-redux:
```bash
$ npm install --save react-router react-router-redux
```

## Routes

`rwr-redux` will wrap Routes with `<Router>` and `<Provider>` components, and also, will sync browserHistory with the store.

[`react/routes/index.js`](https://github.com/caspg/rails-react-examples/blob/master/redux-router/app/react/routes/index.js)
```js
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../containers/App';
import CounterPage from '../containers/CounterPage';
import ScorePage from '../components/ScorePage';
import About from '../components/About';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterPage} />
    <Route path="/score-board" component={ScorePage} />
    <Route path="/about" component={About} />
  </Route>
);

```

## Store

Navbar component will issue [navigation events](https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions) via Redux actions. Those events will change state and cause main component to rerender.

To make it works, you need to apply middleware to the store:
[`react/store/index.js`](https://github.com/caspg/rails-react-examples/blob/master/redux-router/app/react/store/index.js)
```jsx
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middleware = routerMiddleware(browserHistory)

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(middleware)
  );
}
```

## Navbar component

[`react/containers/Navbar.jsx`](https://github.com/caspg/rails-react-examples/blob/master/redux-router/app/react/containers/Navbar.jsx)

Import `push` method from react-router-redux:
```jsx
import { push } from 'react-router-redux';
```

And now you can dispatch an action with navigation event:
```jsx
this.props.dispatch(push(path));
```

## Register store and router

[`react/index.js`](https://github.com/caspg/rails-react-examples/blob/master/redux-router/app/react/index.js)

Register integrations:
```js
import RWR, { integrationsManager } from 'react-webpack-rails';

integrationsManager.register('redux-store', RWRRedux.storeIntegrationWrapper);
integrationsManager.register('redux-container', RWRRedux.containerIntegrationWrapper);
integrationsManager.register('redux-router', RWRRedux.routerIntegrationWrapper);
```

Register store and components:
```js

import CounterStore from './store';
RWRRedux.registerStore('CounterStore', CounterStore);

import Navbar from './containers/Navbar';
RWRRedux.registerContainer('Navbar', Navbar);

import MainRoutes from './routes';
RWRRedux.registerRoutes('MainRoutes', MainRoutes);
```


## Rails part

Add wildcard route:

`routes.rb`
```ruby
root 'home#index'
get '/*path' => 'home#index'
```

Now you can use rails helpers in appropriate view:
```erb
<%= redux_store 'StoreName', { initial_state: @initial_state_from_controller } %>
<%= redux_container 'Navbar' %>

<%= redux_container 'MainApp' %>
```
