import React from 'react';
import { Fragment, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { ApiResponse, Results } from '../core/api.type';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import Loader from '../core/loader/Loader';
import { setFocusOnError } from '../core/page.lib';
import Recaptcha from '../core/recaptcha/Recaptcha';
import {
  getCaptchaResponse,
  resetCaptcha,
} from '../core/recaptcha/recaptcha.lib';
import { login } from './login.service';
import { Credentials } from './login.type';

import './LoginForm.scss';
import { DEFAULT_LANGUAGE } from '../core/intl/getDefaultLanguage';

export interface LoginFormState {
  credentials: Credentials;
  loginResult: ApiResponse;
  isLoading: boolean;
}

const DEFAULT_STATE: LoginFormState = {
  credentials: {
    password: '',
    username: '',
  },
  isLoading: false,
  loginResult: {},
};

const LoginForm = () => {
  // TODO use useReducer instead.
  const [credentials, setCredentials] = useState(DEFAULT_STATE.credentials);
  const [loginResult, setLoginResult] = useState(DEFAULT_STATE.loginResult);
  const [isLoading, setIsLoading] = useState(DEFAULT_STATE.isLoading);
  const { messages, language } = useContext(LanguageContext);

  const handleChange = (attr: string) => (event: any) => {
    const newValue = {
      [attr]: event.target.value,
    };

    setCredentials(previousState => ({
      ...previousState,
      ...newValue,
    }));
  };

  const handleResult = (result: ApiResponse) => {
    setIsLoading(false);
    setLoginResult(result);

    if (result.result === Results.ERROR) {
      setFocusOnError();
      resetCaptcha();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    login({
      ...credentials,
      recaptcha: getCaptchaResponse(),
    })
      .then(handleResult, handleResult)
      .catch(handleResult);
  };

  const shouldRedirect = loginResult.result === Results.SUCCESS;
  if (shouldRedirect) {
    return <Redirect to={`/${language || DEFAULT_LANGUAGE}/registrations`} />;
  }

  return (
    <Fragment>
      {isLoading ? <Loader /> : null}
      <Segment>
        <Header as="h1" data-testid="main-title">
          {getKey('login.page.title', messages)}
        </Header>
        <Form onSubmit={handleSubmit} noValidate={true} className="LoginForm">
          <Form.Field>
            <label htmlFor="username">
              {getKey('login.form.username', messages)}
            </label>
            <input
              id="username"
              data-testid="username"
              name="username"
              autoComplete="username"
              value={credentials.username}
              onChange={handleChange('username')}
              required={true}
              aria-invalid={!!credentials.username}
              maxLength={255}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
              {getKey('login.form.password', messages)}
            </label>
            <input
              id="password"
              type="password"
              data-testid="password"
              name="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange('password')}
              required={true}
              aria-invalid={!!credentials.password}
              maxLength={255}
            />
          </Form.Field>
          <Message
            data-testid="backend-error"
            error={true}
            visible={loginResult.result === Results.ERROR}
            content={loginResult.message}
          />
          <Recaptcha />
          <div className="LoginForm__submit-button-container">
            <Button
              type="submit"
              color="black"
              className="full-width LoginForm__submit-button"
            >
              {getKey('login.form.submit', messages)}
            </Button>
          </div>
        </Form>
      </Segment>
    </Fragment>
  );
};

export default LoginForm;
