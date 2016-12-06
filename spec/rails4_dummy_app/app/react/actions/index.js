import * as types from 'constants/ActionTypes';

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
	new Promise((resolve, reject) => {
  setTimeout(() => {
	    dispatch(increment());
	    resolve();
	  }, delay);
})
);
