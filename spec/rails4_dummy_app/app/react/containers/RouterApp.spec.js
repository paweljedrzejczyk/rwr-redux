import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import RouterApp from './RouterApp';

chai.use(chaiEnzyme());

describe('RouterApp container', () => {
  it('renders CounterApp container', () => {
    const container = shallow(
      <RouterApp
        route={{
          baseRoute: 'redux_router',
        }}
      />
    );

    expect(
      container.find('Connect(Counter)')
    ).to.exist;
  });

  it('renders passed down children', () => {
    const children = (
      <h1 data-test="test-children">Hello world</h1>
    );

    const container = shallow(
      <RouterApp
        route={{
          baseRoute: 'redux_router',
        }}
      >
        {children}
      </RouterApp>
    );

    expect(
      container.find('[data-test="test-children"]')
    ).to.exist;
  });

  it('renders link to about page', () => {
    const container = shallow(
      <RouterApp
        route={{
          baseRoute: 'redux_router',
        }}
      />
    );

    expect(
      container.find('Link[to="/redux_router/about"]')
    ).to.exist;
  });
});