import * as React from 'react';
import { render } from 'react-testing-library';
import LanguageContext from '../intl/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const context = {
  confirmation: '',
  handleChangeLanguage: jest.fn(),
  information: '',
  language: 'en',
  messages: {},
};

const LanguageSwitcherWithContext = () => {
  return (
    <LanguageContext.Provider value={context}>
      <LanguageSwitcher />
    </LanguageContext.Provider>
  );
};

describe('LanguageSwitcher', () => {
  it('should match snapshot', () => {
    const wrapper = render(<LanguageSwitcherWithContext />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should switch language when activating fr', () => {
    const wrapper = render(<LanguageSwitcherWithContext />);

    wrapper.queryByText('FR').click();
    expect(context.handleChangeLanguage).toHaveBeenCalledWith('fr');
  });

  it('should switch language when activating en', () => {
    const wrapper = render(<LanguageSwitcherWithContext />);

    wrapper.queryByText('EN').click();
    expect(context.handleChangeLanguage).toHaveBeenCalledWith('en');
  });

  it('should switch language when activating it', () => {
    const wrapper = render(<LanguageSwitcherWithContext />);

    wrapper.queryByText('IT').click();
    expect(context.handleChangeLanguage).toHaveBeenCalledWith('it');
  });

  it('should switch language when activating de', () => {
    const wrapper = render(<LanguageSwitcherWithContext />);

    wrapper.queryByText('DE').click();
    expect(context.handleChangeLanguage).toHaveBeenCalledWith('de');
  });
});
