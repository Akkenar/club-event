import * as React from 'react';
import { render } from 'react-testing-library';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  it('should match snapshot with placeholder', () => {
    const wrapper = render(
      <LazyImage src="foo" srcwebp="bar" alt="al" className="test" />
    );
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
