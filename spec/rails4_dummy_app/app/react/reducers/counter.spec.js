import reducer from './counter';
import { expect } from 'chai';
import * as types from 'constants/actionTypes';

describe('counter reducer', () => {
  it('returns default state', () => {
    expect(
      reducer(undefined, {}),
    ).to.deep.equal(0);
  });

  it('increments counter', () => {
    expect(
      reducer(undefined, { type: types.INCREMENT_COUNTER }),
    ).to.deep.equal(1);
  });

  it('decrements counter', () => {
    expect(
      reducer(undefined, { type: types.DECREMENT_COUNTER }),
    ).to.deep.equal(-1);
  });

  it('sets the counter on GET_COUNTER_SUCCESS action', () => {
    const counter = 1337;
    expect(
      reducer(undefined, {
        type: types.GET_COUNTER_SUCCESS,
        counter,
      })
    ).to.deep.equal(counter);
  });
});
