import * as React from 'react';
import { setPageLanguage } from '../page.lib';
import { importLanguage } from './importLanguage';
import { IntlType } from './intl.type';
import LanguageContext from './LanguageContext';

interface ProvideMessagesState extends IntlType {
  language: string | null;
}

interface ProvideMessagesProps {
  match: any;
}

export default function provideMessages(Component: any) {
  return class LanguageAndMessages extends React.Component<
    ProvideMessagesProps,
    ProvideMessagesState
  > {
    constructor(props: ProvideMessagesProps) {
      super(props);

      this.state = {
        confirmation: '',
        information: '',
        language: null,
        messages: {},
      };

      this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    }

    public handleChangeLanguage(lang: string) {
      // For a11y reasons
      setPageLanguage(lang);

      // Code splitting
      importLanguage(lang).then(module => {
        const { messages, confirmation, information } = module.default;
        const newMessages = { ...messages, confirmation, information };
        this.setState({
          language: lang,
          messages: newMessages,
        });
      });
    }

    public componentDidMount() {
      this.handleChangeLanguage(this.props.match.params.language);
    }

    public render() {
      const { messages, language } = this.state;
      if (!language) {
        return null;
      }

      const value = {
        handleChangeLanguage: this.handleChangeLanguage,
        language,
        messages,
      };

      return (
        <LanguageContext.Provider value={value}>
          <Component />
        </LanguageContext.Provider>
      );
    }
  };
}
