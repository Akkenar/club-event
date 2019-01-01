import * as React from 'react';
import { Fragment } from 'react';
import { render, waitForElement } from 'react-testing-library';
import { mockGlobalProperty } from '../../test-utils/test-utils.lib';
import { IntlContext } from '../intl/intl.type';
import LanguageContext from '../intl/LanguageContext';
import Recaptcha from './Recaptcha';

const languageContextValue: IntlContext = {
  confirmation: '',
  information: '',
  language: 'en',
  messages: {},
};

const RecaptchaWithLanguage = () => (
  <LanguageContext.Provider value={languageContextValue}>
    <Recaptcha />
  </LanguageContext.Provider>
);

// Simulate the script loading.
jest.spyOn(document.head, 'appendChild').mockImplementation(() => {
  (window as any).onloadCallback();
});

mockGlobalProperty(window)('grecaptcha')({
  render: jest.fn(),
});

describe('Recaptcha', () => {
  it('should render the recaptcha', async () => {
    const wrapper = render(<RecaptchaWithLanguage />);
    await waitForElement(() => wrapper.getByTestId('recaptcha--true'));
    expect((window as any).grecaptcha.render).toHaveBeenCalledTimes(1);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
