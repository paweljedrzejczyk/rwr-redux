# react-router-redux in Rails app

Adding multiple Redux components within Rails view is really easy thanks to [react_webpack_rails](https://github.com/netguru/react_webpack_rails) and [rwr-redux](https://github.com/netguru/rwr-redux).

This guide shows how to do routing with `react-router` and how to sync state between components with Redux store using `react-router-redux`.
Let's say you would like to have two components which shares the same store, navbar and main app component.

If you want check the source code right away, you can find example app [here](https://github.com/caspg/rails-react-exmaples/tree/master/redux-router).

## Setup

* [react_webpack_rails](https://github.com/netguru/react_webpack_rails) and [rwr-redux](https://github.com/netguru/rwr-redux) have to be added and to your app
* install react-router and react-router-redux:
```bash
$ npm install --save react-router react-router-redux
```

## Main app component

In your root component add `<Router>` component and sync history with store.

`react/containers/Root.jsx` [example](https://github.com/caspg/rails-react-exmaples/blob/master/redux-router/app/react/containers/Root.jsx)
```jsx
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import RWRRedux from 'rwr-redux';

import App from './App';
(...)

export default class Root extends Component {
  componentWillMount() {
    const mountedStore = RWRRedux.getStore();
    this.history = syncHistoryWithStore(browserHistory, mountedStore);
  }

  render() {
    return (
      <Router history={this.history} >
        <Route path="/" component={App}>
          (...)
        </Route>
      </Router>
    );
  }
}
```

In `componentWillMount()` method, browserHistory is synced with [registered store](https://github.com/netguru/rwr-redux#register-store-and-components-in-reactindexjs). Store can be accessed by `getStore()` function provided by `rwr-redux` package.

Within this component you can navigate with `<Link>` components ([example](https://github.com/caspg/rails-react-exmaples/blob/master/redux-router/app/react/components/TabItem.jsx#L11)).

## Store

Navbar component will issue [navigation events](https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions) via Redux actions. Those events will change state and cause main component to rerender.

To make it works, you need to apply middleware to the store:
`react/store/index.js`
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

`react/containers/Navbar.jsx` [example](https://github.com/caspg/rails-react-exmaples/blob/master/redux-router/app/react/containers/Navbar.jsx#L15)

Import `push` method from react-router-redux:
```jsx
import { push } from 'react-router-redux';
```

And now you can dispath an action with navigation event:
```jsx
this.props.dispatch(push(path));
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
