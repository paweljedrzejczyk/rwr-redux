import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import About from './About';

chai.use(chaiEnzyme());

describe('About component', () => {
  it('renders About component', () => {
    const component = shallow(
      <About />,
    );

    expect(component.find('[data-test="about-text"]')).to.exist;
  });
});
