import React from 'react';

import { mount } from 'enzyme';

import App from './App';

describe('App', () => {
  it('should have a top anchor', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('#top')).toBeTruthy();
  });
});
