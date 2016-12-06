import React from 'react';
import About from './About';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

describe('About component', () => {
  it('renders About component', () => {
    const component = shallow(
      <About />
    );

    expect(component.find('[data-test="about-text"]')).to.exist;
  });
});