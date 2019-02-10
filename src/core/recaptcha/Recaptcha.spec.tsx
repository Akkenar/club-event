import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render, waitForElement } from 'react-testing-library';
import { mockInterestObservable } from '../../test-utils/intersectObservable-utils.lib';
import { mockGlobalProperty } from '../../test-utils/test-utils.lib';
import { IntlType } from '../intl/intl.type';
import LanguageContext from '../intl/LanguageContext';
import Recaptcha from './Recaptcha';

const languageContextValue: IntlType = {
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
// @ts-ignore
jest.spyOn(document.head, 'appendChild').mockImplementation(() => {
  (window as any).onloadCallback();
});

// Fake render of the recaptcha script.
mockGlobalProperty(window)('grecaptcha')({
  render: jest.fn(),
});

describe('Recaptcha', () => {
  it('should render the recaptcha when not in view', async () => {
    mockInterestObservable();
    const wrapper = render(<RecaptchaWithLanguage />);

    await waitForElement(() => wrapper.getByTestId('captcha-loading'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should render the recaptcha when in view', async () => {
    const triggerComponentInView = mockInterestObservable();
    const wrapper = render(<RecaptchaWithLanguage />);

    act(() => {
      triggerComponentInView();
    });

    await waitForElement(() => wrapper.getByTestId('recaptcha--true'));
    expect((window as any).grecaptcha.render).toHaveBeenCalledTimes(1);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
