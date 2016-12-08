import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import * as types from 'constants/actionTypes';
import * as actions from './index';

const mockStore = configureMockStore([thunk]);

let store;
describe('Counter actions', () => {
  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
    fetchMock.restore();
  });

  it('should increment the counter', () => {
    store.dispatch(actions.increment());

    expect(store.getActions()).to.deep.equal([
      { type: types.INCREMENT_COUNTER },
    ]);
  });

  it('should decrement the counter', () => {
    store.dispatch(actions.decrement());

    expect(store.getActions()).to.deep.equal([
      { type: types.DECREMENT_COUNTER },
    ]);
  });

  it('should increment the counter if odd', () => {
    store = mockStore({ counter: 1 });
    store.dispatch(actions.incrementIfOdd());

    expect(store.getActions()).to.deep.equal([
      { type: types.INCREMENT_COUNTER },
    ]);
  });

  it('should not increment the counter if even', () => {
    store = mockStore({ counter: 2 });
    store.dispatch(actions.incrementIfOdd());

    expect(store.getActions()).to.deep.equal([]);
  });

  it('should increment the counter async', () => {
    return store.dispatch(actions.incrementAsync())
      .then(() => {
        expect(store.getActions()).to.deep.equal([
          { type: types.INCREMENT_COUNTER },
        ]);
      });
  });

  it('should return valid getCounterRequest action', () => {
    store.dispatch(actions.getCounterRequest());

    expect(store.getActions()).to.deep.equal([
      { type: types.GET_COUNTER_REQUEST },
    ]);
  });

  it('should return valid getCounterFailure action', () => {
    store.dispatch(actions.getCounterFailure());

    expect(store.getActions()).to.deep.equal([
      { type: types.GET_COUNTER_FAILURE },
    ]);
  });

  it('should return valid getCounterSuccess action', () => {
    const counter = 1337;
    store.dispatch(actions.getCounterSuccess(counter));

    expect(store.getActions()).to.deep.equal([
      {
        type: types.GET_COUNTER_SUCCESS,
        counter,
      },
    ]);
  });

  it('handles getCounter success response', () => {
    const counter = 1337;
    fetchMock.get('/api/counter', { counter });

    return store.dispatch(actions.getCounter())
      .then(() => {
        expect(store.getActions()).to.deep.equal([
          { type: types.GET_COUNTER_REQUEST },
          {
            type: types.GET_COUNTER_SUCCESS,
            counter,
          }
        ]);
      });
  });

  it('handles getCounter failure response', () => {
    fetchMock.get('/api/counter', 400);

    return store.dispatch(actions.getCounter())
      .then(() => {
        expect(store.getActions()).to.deep.equal([
          { type: types.GET_COUNTER_REQUEST },
          { type: types.GET_COUNTER_FAILURE },
        ]);
      });
  });
});
