import * as React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import { getDefaultLanguage } from './getDefaultLanguage';

interface LanguageInRouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const LanguageInRoute = ({ component }: LanguageInRouteProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:language([a-z]{2})" component={component} />
        <Redirect to={`/${getDefaultLanguage()}`} />
      </Switch>
    </BrowserRouter>
  );
};

export default LanguageInRoute;
