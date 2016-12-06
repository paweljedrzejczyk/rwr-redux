import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
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
});
