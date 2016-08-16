import React, { Component, PropTypes } from 'react'

class Counter extends Component {
  render() {
    const { name, increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props
    return (
      <div>
      <b>
        Counter Name: {name}
      </b>
      <p>
        Clicked: <strong>{counter}</strong> times
        {' '}
        <button onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
      </p>
      </div>
    )
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}

export default Counter
