import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import CounterApp from 'containers/CounterApp';

const RouterApp = ({ children, route: { baseRoute } }) => (
  <div>
    <Link to={`/${baseRoute}/about`}>About</Link>

    <CounterApp />

    {children}
  </div>
);

RouterApp.propTypes = {
  children: PropTypes.shape({}),
  route: PropTypes.shape({
    baseRoute: PropTypes.string,
  }).isRequired,
};

export default RouterApp;
