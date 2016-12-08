import * as types from 'constants/ActionTypes';
import * as api from 'api';

export const increment = () => ({
  type: types.INCREMENT_COUNTER,
});

export const decrement = () => ({
  type: types.DECREMENT_COUNTER,
});

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) { return; }

  dispatch(increment());
};

export const incrementAsync = (delay = 1000) => dispatch => (
  new Promise((resolve) => {
    setTimeout(() => {
      dispatch(increment());
      resolve();
    }, delay);
  })
);

export const getCounterRequest = () => ({
  type: types.GET_COUNTER_REQUEST,
});

export const getCounterFailure = () => ({
  type: types.GET_COUNTER_FAILURE,
});

export const getCounterSuccess = counter => ({
  type: types.GET_COUNTER_SUCCESS,
  counter,
});

export const getCounter = () => (dispatch) => {
  dispatch(getCounterRequest());

  return api.getCounter()
    .then(({ counter }) => {
      dispatch(getCounterSuccess(counter));
    })
    .catch(() => {
      dispatch(getCounterFailure());
    });
};
