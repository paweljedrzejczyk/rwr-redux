import React from 'react';
import { Route, Redirect } from 'react-router';

import RouterApp from 'containers/RouterApp';
import About from 'components/About';

export default (
  <Route path="/server_side_render" component={RouterApp} baseRoute="server_side_render">
    <Route path="about" component={About} />
    <Redirect from="redirect" to="/server_side_render" />
  </Route>
);
