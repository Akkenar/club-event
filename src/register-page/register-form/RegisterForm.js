import React, { useContext } from 'react';

import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import BookingField from './BookingField';
import Recaptcha from '../../core/recaptcha/Recaptcha';
import { Redirect } from 'react-router-dom';

import './RegisterForm.scss';

const RegisterForm = ({ handleSubmit, handleChange, state, total }) => {
  const { messages, language } = useContext(LanguageContext);

  const hasErrors = () => {
    const { errors } = state;
    return Object.keys(errors).some(key => errors[key]);
  };

  if (state.success) {
    return <Redirect to={`/${language}/confirmation`} />;
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Message
        error
        data-testid="backend-error"
        visible={!hasErrors() && state.transmitError}
        header={getKey('register.form.error.title', messages)}
        content={getKey('register.form.error.message', messages)}
      />
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
              data-testid="firstName"
              name="firstName"
              placeholder={getKey(
                'register.form.firstName.placeholder',
                messages
              )}
              value={state.firstName}
              onChange={handleChange}
              required
              aria-invalid={state.errors.firstName}
              maxLength={255}
            />
          </Form.Field>
          <Form.Field required error={state.errors.lastName}>
            <label htmlFor="lastName">
              {getKey('register.form.lastName', messages)}
            </label>
            <input
              id="lastName"
              data-testid="lastName"
              name="lastName"
              placeholder={getKey(
                'register.form.lastName.placeholder',
                messages
              )}
              value={state.lastName}
              onChange={handleChange}
              required
              aria-invalid={state.errors.lastName}
              maxLength={255}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field required error={state.errors.club}>
          <label htmlFor="club">{getKey('register.form.club', messages)}</label>
          <input
            id="club"
            data-testid="club"
            name="club"
            placeholder={getKey('register.form.club.placeholder', messages)}
            value={state.club}
            onChange={handleChange}
            required
            aria-invalid={state.errors.club}
            maxLength={255}
          />
        </Form.Field>
        <Form.Field required error={state.errors.email}>
          <label htmlFor="email">
            {getKey('register.form.email', messages)}
          </label>
          <input
            id="email"
            data-testid="email"
            name="email"
            placeholder={getKey('register.form.email.placeholder', messages)}
            value={state.email}
            onChange={handleChange}
            required
            aria-invalid={state.errors.email}
            aria-describedby={state.errors.email ? 'email-error' : null}
            type="email"
            maxLength={255}
            autoComplete="email"
          />
          <Message
            error
            id="email-error"
            visible={state.errors.email}
            content={getKey('register.form.email.error.message', messages)}
          />
        </Form.Field>
        <Header dividing as={'h3'}>
          {getKey('register.form.address', messages)}
        </Header>
        <Form.Group widths={16}>
          <Form.Field width={13} required error={state.errors.street}>
            <label htmlFor="street">
              {getKey('register.form.address.street', messages)}
            </label>
            <input
              id="street"
              data-testid="street"
              name="street"
              placeholder={getKey(
                'register.form.address.street.placeholder',
                messages
              )}
              value={state.street}
              onChange={handleChange}
              required
              aria-invalid={state.errors.street}
              maxLength={255}
              autoComplete="street-address"
            />
          </Form.Field>
          <Form.Field width={3} required error={state.errors.no}>
            <label htmlFor="no">
              {getKey('register.form.address.no', messages)}
            </label>
            <input
              id="no"
              data-testid="no"
              name="no"
              placeholder={getKey(
                'register.form.address.no.placeholder',
                messages
              )}
              value={state.no}
              onChange={handleChange}
              required
              aria-invalid={state.errors.no}
              maxLength={10}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field required error={state.errors.npa}>
            <label htmlFor="npa">
              {getKey('register.form.address.npa', messages)}
            </label>
            <input
              id="npa"
              data-testid="npa"
              name="npa"
              placeholder={getKey(
                'register.form.address.npa.placeholder',
                messages
              )}
              value={state.npa}
              onChange={handleChange}
              required
              aria-invalid={state.errors.npa}
              maxLength={255}
              type="number"
              autoComplete="postal-code"
            />
          </Form.Field>
          <Form.Field required error={state.errors.locality}>
            <label htmlFor="locality">
              {getKey('register.form.address.locality', messages)}
            </label>
            <input
              id="locality"
              data-testid="locality"
              name="locality"
              placeholder={getKey(
                'register.form.address.locality.placeholder',
                messages
              )}
              value={state.locality}
              onChange={handleChange}
              required
              aria-invalid={state.errors.locality}
              maxLength={255}
            />
          </Form.Field>
        </Form.Group>
      </Segment>
      <Segment>
        <Header dividing as={'h2'}>
          {getKey('register.form.counts', messages)}
        </Header>
        <p>{getKey('register.form.counts.description', messages)}</p>
        <Header dividing as={'h3'}>
          {getKey('register.form.food', messages)}
        </Header>
        <p>{getKey('register.form.food.description', messages)}</p>
        <Form.Group widths="equal">
          <BookingField
            state={state}
            name="dinner"
            handleChange={handleChange}
          />
          <BookingField
            state={state}
            name="vegetarian"
            handleChange={handleChange}
          />
        </Form.Group>
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
        <Header dividing as={'h3'}>
          {getKey('register.form.accommodation', messages)}
        </Header>
        <p>{getKey('register.form.accommodation.description', messages)}</p>
        <Form.Group widths="equal">
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
        <Message
          error
          visible={state.errors.total}
          content={getKey('register.form.error.total', messages)}
        />
        <div className="RegisterForm__total-price">
          {getKey('register.form.counts.total', messages)} : CHF {total}
        </div>
      </Segment>
      <Message
        data-testid="validation-error"
        error
        visible={hasErrors()}
        content={getKey('register.form.validation.error', messages)}
      />
      <Message
        error
        visible={state.errors.recaptcha}
        content={getKey('register.form.error.recaptcha', messages)}
      />
      <Recaptcha />
      <div className="RegisterForm__submit-button-container">
        <Button
          type="submit"
          color="black"
          className="full-width RegisterForm__submit-button"
        >
          {getKey('register.form.submit', messages)}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
