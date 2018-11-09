import React, { useContext } from 'react';

import { Button, Form, Header, Message } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import BookingField from './BookingField';

import './SignupForm.scss';

const SignupForm = ({ handleSubmit, handleChange, state, total }) => {
  const { messages } = useContext(LanguageContext);

  const hasErrors = () => {
    const { errors } = state;
    return Object.keys(errors).some(key => errors[key]);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Header dividing as={'h2'}>
        {getKey('register.form.personalInfo', messages)}
      </Header>
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
      <Form.Field required error={state.errors.club}>
        <label htmlFor="club">{getKey('register.form.club', messages)}</label>
        <input
          id="club"
          name="club"
          placeholder={getKey('register.form.club.placeholder', messages)}
          value={state.club}
          onChange={handleChange}
          required
          aria-invalid={state.errors.club}
        />
      </Form.Field>
      <Form.Field required error={state.errors.email}>
        <label htmlFor="email">{getKey('register.form.email', messages)}</label>
        <input
          id="email"
          name="email"
          placeholder={getKey('register.form.email.placeholder', messages)}
          value={state.email}
          onChange={handleChange}
          required
          aria-invalid={state.errors.email}
          type="email"
        />
        <Message
          error
          visible={state.errors.email}
          content={getKey('register.form.email.error.message', messages)}
        />
      </Form.Field>
      <Header dividing as={'h2'}>
        {getKey('register.form.counts', messages)}
      </Header>
      <Form.Group widths="equal">
        <BookingField
          error={state.errors.counts}
          state={state}
          name="dinner"
          handleChange={handleChange}
        />
        <BookingField
          error={state.errors.counts}
          state={state}
          name="sleeping"
          handleChange={handleChange}
        />
        <BookingField
          error={state.errors.counts}
          state={state}
          name="breakfast"
          handleChange={handleChange}
        />
      </Form.Group>
      <div className="SignupForm__total-price">
        {getKey('register.form.counts.total', messages)} : CHF {total}
      </div>
      <Form.Field>
        <label htmlFor="comment">
          {getKey('register.form.comment', messages)}
        </label>
        <textarea
          aria-multiline={true}
          id="comment"
          name="comment"
          placeholder={getKey('register.form.comment.placeholder', messages)}
          value={state.comment}
          onChange={handleChange}
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
