import React, { Component, PropTypes } from 'react';

const Counter = (props) => (
  <div>
    <b>
      Counter Name: {props.name || 'no name :('}
    </b>
    <p>
      Clicked: <strong>{props.counter}</strong> times
      {' '}
      <button onClick={props.increment}>+</button>
      {' '}
      <button onClick={props.decrement}>-</button>
      {' '}
      <button onClick={props.incrementIfOdd}>Increment if odd</button>
      {' '}
      <button onClick={props.incrementAsync}>Increment async</button>
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
