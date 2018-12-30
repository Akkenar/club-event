import * as React from 'react';
import LanguageInRoute from './LanguageInRoute';
import provideMessages from './provideMessages';

export default function provideLanguage(Component: React.ComponentType<any>) {
  const LanguageProvider = () => (
    <LanguageInRoute component={provideMessages(Component)} />
  );

  return LanguageProvider;
}
