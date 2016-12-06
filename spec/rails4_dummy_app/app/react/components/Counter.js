import React, { PropTypes } from 'react';

const Counter = (props) => (
  <div>
    <b data-test="counter-name">
      Counter Name: {props.name || 'no name :('}
    </b>
    <p>
      Clicked: <strong data-test="counter">{props.counter}</strong> times
      {' '}
      <button
        data-test="increment-btn"
        onClick={props.increment}
      >
        +
      </button>
      {' '}
      <button
        data-test="decrement-btn"
        onClick={props.decrement}
      >
        -
      </button>
      {' '}
      <button
        data-test="incrementIfOdd-btn"
        onClick={props.incrementIfOdd}
      >
        Increment if odd
      </button>
      {' '}
      <button
        data-test="incrementAsync-btn"
        onClick={props.incrementAsync}
      >
        Increment async
      </button>
    </p>
  </div>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default Counter;
