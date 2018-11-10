import React, { useContext } from 'react';

import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
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
      <p>{getKey('register.form.description', messages)}</p>
      <Segment>
        <Header dividing as={'h2'}>
          {getKey('register.form.personalInfo', messages)}
        </Header>
        <Form.Group widths="equal">
          <Form.Field required error={state.errors.firstName}>
            <label htmlFor="firstName">
              {getKey('register.form.firstName', messages)}
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder={getKey(
                'register.form.firstName.placeholder',
                messages
              )}
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
              placeholder={getKey(
                'register.form.lastName.placeholder',
                messages
              )}
              value={state.lastName}
              onChange={handleChange}
              required
              aria-invalid={state.errors.lastName}
            />
          </Form.Field>
        </Form.Group>
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
          <label htmlFor="email">
            {getKey('register.form.email', messages)}
          </label>
          <input
            id="email"
            name="email"
            placeholder={getKey('register.form.email.placeholder', messages)}
            value={state.email}
            onChange={handleChange}
            required
            aria-invalid={state.errors.email}
            aria-describedby={state.errors.email ? 'email-error' : null}
            type="email"
          />
          <Message
            error
            id="email-error"
            visible={state.errors.email}
            content={getKey('register.form.email.error.message', messages)}
          />
        </Form.Field>
      </Segment>
      <Segment>
        <Header dividing as={'h2'}>
          {getKey('register.form.counts', messages)}
        </Header>
        <p>{getKey('register.form.counts.description', messages)}</p>
        <Form.Field required error={state.errors.meeting}>
          <label htmlFor="meeting">
            {getKey('register.form.meeting', messages)}
          </label>
          <select
            id="meeting"
            name="meeting"
            value={state.meeting}
            onChange={handleChange}
            required
            aria-invalid={state.errors.meeting}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </Form.Field>
        <Header dividing as={'h3'}>
          {getKey('register.form.saturday', messages)}
        </Header>
        <p>{getKey('register.form.saturday.description', messages)}</p>
        <Form.Group widths="equal">
          <BookingField
            state={state}
            name="dinner"
            handleChange={handleChange}
          />
          <BookingField
            state={state}
            name="sleeping"
            handleChange={handleChange}
          />
          <BookingField
            state={state}
            name="camping"
            handleChange={handleChange}
          />
        </Form.Group>
        <Header dividing as={'h3'}>
          {getKey('register.form.sunday', messages)}
        </Header>
        <p>{getKey('register.form.sunday.description', messages)}</p>
        <Form.Group widths="equal">
          <BookingField
            state={state}
            name="breakfast"
            handleChange={handleChange}
          />
          <BookingField
            state={state}
            name="picknick"
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
      </Segment>
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
      <div className="SignupForm__submit-button-container">
        <Button
          type="submit"
          color="black"
          className="full-width SignupForm__submit-button"
        >
          {getKey('register.form.submit', messages)}
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;
