import React, { useContext } from 'react';

import { Button, Form, Message } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';

const SignupForm = ({ handleSubmit, handleChange, state }) => {
  const { messages } = useContext(LanguageContext);

  const hasErrors = () => {
    const { errors } = state;
    return Object.keys(errors).some(key => errors[key]);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Field required error={state.errors.firstName}>
        <label htmlFor="firstName">
          {getKey('register.form.firstName', messages)}
        </label>
        <input
          id="firstName"
          name="firstName"
          placeholder={getKey('register.form.firstName.placeholder', messages)}
          value={state.firstName}
          onChange={handleChange}
          required
          aria-invalid={state.errors.firstName}
        />
      </Form.Field>
      <Form.Field required error={state.errors.lastName}>
        <label htmlFor="lastName">
          {getKey('register.form.lastName', messages)}
        </label>
        <input
          id="lastName"
          name="lastName"
          placeholder={getKey('register.form.lastName.placeholder', messages)}
          value={state.lastName}
          onChange={handleChange}
          required
          aria-invalid={state.errors.lastName}
        />
      </Form.Field>
      <Message
        error
        visible={hasErrors()}
        content={getKey('register.form.validation.error', messages)}
      />
      <Message
        error
        visible={!hasErrors() && state.transmitError}
        header={getKey('register.form.error.title', messages)}
        content={getKey('register.form.error.message', messages)}
      />
      <Button type="submit">{getKey('register.form.submit', messages)}</Button>
    </Form>
  );
};

export default SignupForm;
