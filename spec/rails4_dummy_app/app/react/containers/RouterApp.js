import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CounterApp from 'containers/CounterApp';
import * as CounterActions from 'actions';

export class RouterApp extends Component {
  render() {
    const {
      children,
    } = this.props;
    const baseRoute = this.props.route.baseRoute;

    return (
      <div>
        <Link to={`/${baseRoute}/about`}>About</Link>

        <CounterApp />

        {children}
      </div>
    );
  }
}

RouterApp.propTypes = {
  children: PropTypes.object,
};

export default RouterApp;
