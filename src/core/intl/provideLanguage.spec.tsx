import { useContext } from 'react';
import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import LanguageContext from './LanguageContext';
import provideLanguage from './provideLanguage';

jest.mock('./languages/en', () => ({}));

const TestComponent = () => {
  const { language } = useContext(LanguageContext);
  return language ? <div data-testid="test">{language}</div> : null;
};

describe('provideLanguage', () => {
  it('should provide the language', async () => {
    const ComponentWithLanguage = provideLanguage(TestComponent);
    const wrapper = render(<ComponentWithLanguage />);

    await waitForElement(() => wrapper.queryByTestId('test'));
    expect(wrapper.queryByTestId('test').textContent).toEqual('en');
  });
});
