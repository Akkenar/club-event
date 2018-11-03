import React from 'react';

import { shallow } from 'enzyme';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('should init', () => {
    expect(shallow(<HomePage />).contains(<div>Home</div>)).toBe(true);
  });
});
