import React from 'react';
import { render } from 'react-testing-library';
import LanguageSwitcher from './LanguageSwitcher';
import { BrowserRouter } from 'react-router-dom';
import LanguageContext from '../intl/LanguageContext';

const context = {
  messages: {},
  language: 'en',
  handleChangeLanguage: jest.fn(),
};

const LanguageSwitcherWithRouter = () => {
  return (
    <BrowserRouter>
      <LanguageContext.Provider value={context}>
        <LanguageSwitcher />
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

describe('LanguageSwitcher', () => {
  it('should match snapshot', () => {
    const wrapper = render(<LanguageSwitcherWithRouter />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should switch language when activating a link', () => {
    const wrapper = render(<LanguageSwitcherWithRouter />);

    const french = wrapper.queryByText('FR');
    french.click();
    expect(context.handleChangeLanguage).toHaveBeenCalledWith('fr');
  });
});
