import React from 'react';
import { render } from 'react-testing-library';
import SignupFormContainer from './SignupFormContainer';

describe('SignupFormContainer', () => {
  it('should match snapshot', () => {
    const wrapper = render(<SignupFormContainer/>);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
