import React from 'react';
import Counter from './Counter';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

describe('Counter component', () => {
  it('renders Counter component', () => {
    const component = shallow(
      <Counter
        increment={jest.fn}
        incrementIfOdd={jest.fn}
        incrementAsync={jest.fn}
        decrement={jest.fn}
        counter={0}
      />
    );

    expect(component.find('[data-test="counter-name"]')).to.exist;
    expect(component.find('[data-test="counter"]')).to.exist;
    expect(component.find('[data-test="increment-btn"]')).to.exist;
    expect(component.find('[data-test="decrement-btn"]')).to.exist;
    expect(component.find('[data-test="incrementIfOdd-btn"]')).to.exist;
    expect(component.find('[data-test="incrementAsync-btn"]')).to.exist;
  });

  it('renders passed counter name', () => {
    const sampleName = 'Foobar';
    const component = shallow(
      <Counter
        increment={jest.fn}
        incrementIfOdd={jest.fn}
        incrementAsync={jest.fn}
        decrement={jest.fn}
        counter={0}
        name={sampleName}
      />
    );

    expect(
      component.find('[data-test="counter-name"]').text()
    ).to.equal(
      `Counter Name: ${sampleName}`
    );
  });

  it('renders no name if counter name is not passed', () => {
    const component = shallow(
      <Counter
        increment={jest.fn}
        incrementIfOdd={jest.fn}
        incrementAsync={jest.fn}
        decrement={jest.fn}
        counter={0}
      />
    );

    expect(
      component.find('[data-test="counter-name"]').text()
    ).to.equal(
      `Counter Name: no name :(`
    );
  });

  it('renders passed counter value', () => {
    const counterValue = 1337;
    const component = shallow(
      <Counter
        increment={jest.fn}
        incrementIfOdd={jest.fn}
        incrementAsync={jest.fn}
        decrement={jest.fn}
        counter={counterValue}
      />
    );

    expect(
      component.find('[data-test="counter"]').text()
    ).to.equal(
      `${counterValue}`
    );
  });

  it('calls passed down actions', () => {
    const incrementFnSpy = jest.fn();
    const incrementIfOddFnSpy = jest.fn();
    const incrementAsyncFnSpy = jest.fn();
    const decrementFnSpy = jest.fn();

    const component = shallow(
      <Counter
        increment={incrementFnSpy}
        incrementIfOdd={incrementIfOddFnSpy}
        incrementAsync={incrementAsyncFnSpy}
        decrement={decrementFnSpy}
        counter={0}
      />
    );

    const incrementBtn = component.find('[data-test="increment-btn"]');
    incrementBtn.simulate('click');
    expect(incrementFnSpy.mock.calls.length).to.equal(1);

    const decrementBtn = component.find('[data-test="decrement-btn"]');
    decrementBtn.simulate('click');
    expect(decrementFnSpy.mock.calls.length).to.equal(1);

    const incrementIfOddBtn = component.find('[data-test="incrementIfOdd-btn"]');
    incrementIfOddBtn.simulate('click');
    expect(incrementIfOddFnSpy.mock.calls.length).to.equal(1);

    const incrementAsyncBtn = component.find('[data-test="incrementAsync-btn"]');
    incrementAsyncBtn.simulate('click');
    expect(incrementAsyncFnSpy.mock.calls.length).to.equal(1);
  });
});