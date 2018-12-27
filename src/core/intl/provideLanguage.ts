import { provideLanguageInRoute } from './provideLanguageInRoute';
import provideMessages from './provideMessages';

export default function provideLanguage(Component: any) {
  return provideLanguageInRoute(provideMessages(Component));
}
