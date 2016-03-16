rwr-redux
====
[Redux.js](http://redux.js.org/) integration plugin for [react_webpack_rails](https://github.com/netguru/react_webpack_rails).

This integration allows to use redux state containers in a diffrent part of rails views.

## Setup
* Add `rwr-redux` to your Gemfile:

```
gem 'rwr-redux'
```

* Install rwr-redux package:

```
$ npm install --save rwr-redux
```

## Usage

### register store and components in react/index.js

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

### use registered store and componetns in Rails view

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

### using redux DevTools

register in `react/index.js`:

```js
import DevTools from './containers/DevTools';
RWRRedux.registerContainer('DevTools', DevTools);
```
use in Rails view:

```erb
<%= redux_container 'DevTools' %>
```

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
