import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Counter from '../components/Counter';
import * as CounterActions from '../actions';

export class RouterApp extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter, children } = this.props;
    const baseRoute = this.props.route.baseRoute;

    return (
      <div>
        <Link to={`/${baseRoute}/about`}>About</Link>

        <Counter
          counter={counter}
          increment={increment}
          incrementIfOdd={incrementIfOdd}
          incrementAsync={incrementAsync}
          decrement={decrement}
        />

        {children}
      </div>
    );
  }
}

RouterApp.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  children: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterApp);
