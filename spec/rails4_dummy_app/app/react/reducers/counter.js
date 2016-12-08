import * as types from 'constants/ActionTypes';

export default function counter(state = 0, action) {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      return state + 1;
    case types.DECREMENT_COUNTER:
      return state - 1;
    case types.GET_COUNTER_SUCCESS:
      return action.counter;
    default:
      return state;
  }
}
