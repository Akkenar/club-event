import React from 'react';
import { setPageLanguage } from '../../page.lib';
import LanguageContext from './LanguageContext';
import { importLanguage } from './importLanguage';

export default function provideMessages(Component) {
  return class LanguageAndMessages extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        language: null,
        messages: {},
        confirmation: null,
        information: null,
      };

      this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    }

    handleChangeLanguage(lang) {
      // For a11y reasons
      setPageLanguage(lang);

      // Code splitting
      importLanguage(lang).then(module => {
        const { messages, confirmation, information } = module.default;
        this.setState({
          language: lang,
          messages: Object.assign({}, messages, {
            confirmation,
            information,
          }),
        });
      });
    }

    componentDidMount() {
      this.handleChangeLanguage(this.props.match.params.language);
    }

    render() {
      const { messages, language } = this.state;
      if (!language) {
        return null;
      }

      return (
        <LanguageContext.Provider
          value={{
            messages,
            language,
            handleChangeLanguage: this.handleChangeLanguage,
          }}
        >
          <Component />
        </LanguageContext.Provider>
      );
    }
  };
}
