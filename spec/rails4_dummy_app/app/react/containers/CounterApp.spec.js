import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import configureMockStore from 'redux-mock-store';
import { bindActionCreators } from 'redux';
import CounterApp from './CounterApp';
import * as CounterActions from 'actions';

chai.use(chaiEnzyme());

const mockStore = configureMockStore();

describe('CounterApp container', () => {
  it('renders CounterApp container', () => {
    const counterValue = 1337;
    const store = mockStore({
      counter: counterValue,
    });

    const container = shallow(
      <CounterApp
        store={store}
      />,
    );

    expect(
      container.props().counter,
    ).to.equal(
      counterValue,
    );

    expect(
      container.props(),
    ).to.contain.all.keys([
      'increment',
      'incrementIfOdd',
      'incrementAsync',
      'decrement',
      'getCounter',
      'counter',
    ]);
  });
});
