import React from 'react';
import { render } from '@testing-library/react';
import { IntlType } from '../core/intl/intl.type';
import LanguageContext from '../core/intl/LanguageContext';
import { setSimpleStore } from '../core/simpleStore';
import { mockInterestObservable } from '../test-utils/intersectObservable-utils.lib';
import { mockGlobalProperty } from '../test-utils/test-utils.lib';
import ConfirmationPage from './ConfirmationPage';

const languageContextValue: IntlType = {
  // To assert replacement.
  confirmation: 'Total: %TOTAL%, reference: %REFERENCE%',
  information: '',
  schedule: '',
  language: 'en',
  messages: {},
};

const ConfirmationPageWithContext = () => (
  <LanguageContext.Provider value={languageContextValue}>
    <ConfirmationPage />
  </LanguageContext.Provider>
);

describe('ConfirmationPage', () => {
  beforeEach(() => {
    setSimpleStore({
      club: 'GSL',
      email: 'test@test.ch',
      firstName: 'foo',
      language: 'en',
      lastName: 'bar',
      locality: 'Lausanne',
      no: '5',
      npa: '1018',
      products: {
        breakfast: 1,
        camping: 1,
        dinner: 4,
        dinnerKid: 1,
        picknick: 1,
        sleepingAtGym: 1,
        vegetarian: 4,
        vegetarianKid: 1,
      },
      recaptcha: '2131',
      reference: 'TEST-123132',
      sending: false,
      street: 'Rue de Lausanne',
      total: 100,
    });
    mockInterestObservable();
  });

  it('should match the snapshot', () => {
    const wrapper = render(<ConfirmationPageWithContext />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should handle empty registration', () => {
    setSimpleStore(null);
    const wrapper = render(<ConfirmationPageWithContext />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<ConfirmationPage />);
    expect(document.title).toEqual('confirmation.page.title');
  });

  it('should print the page', () => {
    const wrapper = render(<ConfirmationPage />);

    mockGlobalProperty(window)('print')(jest.fn());
    wrapper.getByText('confirmation.page.print').click();
    expect(window.print).toHaveBeenCalledTimes(1);
  });

  it('should not render the print button if print is not supported', async () => {
    mockGlobalProperty(window)('print')(null);

    const wrapper = render(<ConfirmationPage />);
    expect(wrapper.getByText('confirmation.page.print')).toHaveClass(
      'disabled',
    );
  });
});
