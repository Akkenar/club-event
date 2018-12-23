import React from 'react';
import { render } from 'react-testing-library';
import RegisterFormContainer from './RegisterFormContainer';

describe('RegisterFormContainer', () => {
  it('should match snapshot', () => {
    const wrapper = render(<RegisterFormContainer />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
