import { useContext } from 'react';
import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';
import LanguageContext from './LanguageContext';
import provideTranslations from './provideTranslations';

jest.mock('./languages/en', () => ({}));

const TestComponent = () => {
  const { language } = useContext(LanguageContext);
  return language ? <div data-testid="test">{language}</div> : null;
};

describe('provideLanguage', () => {
  it('should provide the language', async () => {
    const ComponentWithLanguage = provideTranslations(TestComponent);
    const wrapper = render(<ComponentWithLanguage />);

    await waitForElement(() => wrapper.queryByTestId('test'));
    expect(wrapper.queryByTestId('test').textContent).toEqual('en');
  });
});
