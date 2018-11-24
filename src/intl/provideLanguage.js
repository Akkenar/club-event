import React from 'react';
import { provideLanguageInRoute } from './provideLanguageInRoute';
import provideMessages from './provideMessages';

export default function provideLanguage(Component) {
  return provideLanguageInRoute(provideMessages(Component));
}
