rwr-redux
====
[Redux.js](http://redux.js.org/) integration plugin for [react_webpack_rails](https://github.com/netguru/react_webpack_rails).

It allows you to use Redux state containers in a different part of Rails views. Thanks to this gem you can use multiple components (Redux containers) in one page. They can easily access the same store and have their state synced.

#### Guides and Examples
* basic react redux rails example: [app](https://github.com/caspg/rails-react-examples/tree/master/basic-redux)
* how to use Redux and react-router in Rails app: [guide](https://github.com/netguru/rwr-redux/blob/master/docs/rails-redux-router.md) and [example](https://github.com/caspg/rails-react-examples/tree/master/redux-router).


## Setup
* Add `rwr-redux` to your Gemfile:

```ruby
gem 'rwr-redux'
```

* Install `rwr-redux` and `redux` packages:

```
$ npm install --save redux react-redux rwr-redux
```

## Usage

First of all, you have to register your store and containers in `react/index.js`. Then you can use them in a Rails view using provided helpers.
When page is loaded, your container component is wrapped with [`<Provider>`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) component and will have access to defined store.


### register integrations, store and components in `react/index.js`

Register integrations:
```js
integrationsManager.register('redux-store', RWRRedux.storeIntegrationWrapper);
integrationsManager.register('redux-container', RWRRedux.containerIntegrationWrapper);
```

Register store:

```js
import Store from './store';
RWRRedux.registerStore('MyStoreName', Store);
```

Register redux container:

```js
import Container from './containers/MyContainerName';
RWRRedux.registerContainer('MyContainerName', Container);
```

### store

Registered store has to be a function which accepts **initial state** as an argument and returns store object:

```js
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
```

### use registered store and components in Rails view

Define store with initial state:

```erb
<%= redux_store 'MyStoreName', { foo: @bar } %>
```

Add Redux container:

```erb
<%= redux_container 'MyContainerName' %>
```

If you have more than one store in a view, you can specify `store_name`:

```erb
<%= redux_container 'MyContainerName', store_name: 'MyStoreName' %>
```

## Usage with react-redux-router

If you want to use router in your redux app, you have to only create routes component. `rwr-redux` will wrapp it with `<Router>` and `<Provider>`components, and also will sync history with store. Only `browserHistory` is supported.

### example routes
`app/react/routes/index.js`

```js
export default (
  <Route path="/" component={App}>
    <Route path="about" component={About} />
  </Route>
)
```

### register integration and routes in `react/index.js`

```js
integrationsManager.register('redux-router', RWRRedux.routerIntegrationWrapper);
```

```js
import RoutesName from './routes';
RWRRedux.registerRoutes('RoutesName', RoutesName);
```

### use registered routes in Rails view

Do not forget to use `redux_store` helper.

```erb
<%= redux_store 'MyStoreName', { foo: @bar } %>

<%= redux_router 'RoutesName' %>
```

## Server Side Rendering

More info how to use server side rendering with `react_webpack_rails`: [click](https://github.com/netguru/react_webpack_rails/blob/master/docs/server_side_rendering.md)

Rails routes has to be properly setup:

```rb
get '/server_side/' => 'pages#server_side'
get '/server_side/*path' => 'pages#server_side'
```

To enable server side rendering pass `server_side: true` to helpers options:

```erb
<%= redux_store 'MyStoreName', { foo: @bar }, server_side: true %>

<%= redux_container 'MyContainerName', server_side: true %>

<%= redux_router 'RoutesName', server_side: true %>
```

**NOTE**: `rwr-redux` automatically handles matching, redirecting and routing errors. Redirects and 404's are passed to Rails and handled there so you will be redirect or get 404 page like in normal Rails app.

## Contributing
## Issues

Found a bug in rwr-redux? Open an issue on [GitHub Issues](https://github.com/netguru/rwr-redux/issues).

## Pull requests

Interested in contributing to rwr-redux? That's great, and thank you for your interest!

After checking out the repo, run `bundle exec rake setup:all` to install every environment dependencies.

To get your contributions accepted, make sure:

* All the tests pass. Run `bundle exec rake test:all`.
* Any new code paths you've added are covered by tests.
* Describe your changes in pull request (what it adds, how to migrate from previous version etc.)

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
