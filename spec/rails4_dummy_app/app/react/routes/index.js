import React from 'react';
import { Route } from 'react-router';

import RouterApp from 'containers/RouterApp';
import About from 'components/About';

export default (
  <Route path="/redux_router" component={RouterApp} baseRoute="redux_router">
    <Route path="about" component={About} />
  </Route>
);
