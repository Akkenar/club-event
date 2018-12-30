import * as React from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import Recaptcha from '../../core/recaptcha/Recaptcha';
import Products from './Products';
import { SetQuantityType } from './QuantitySelector';

import './RegisterForm.scss';

export interface RegisterFormProps {
  handleSubmit: any;
  handleChange: any;
  handleChangeProduct: SetQuantityType;
  state: any;
  total: number;
}

const RegisterForm = ({
  handleSubmit,
  handleChange,
  handleChangeProduct,
  state,
  total,
}: RegisterFormProps) => {
  const { messages, language } = useContext(LanguageContext);

  const hasErrors = () => {
    const { errors } = state;
    return Object.keys(errors).some(key => errors[key]);
  };

  if (state.success) {
    return <Redirect to={`/${language}/confirmation`} />;
  }

  return (
    <Form onSubmit={handleSubmit} noValidate={true} className="RegisterForm">
      <Message
        error={true}
        data-testid="backend-error"
        visible={!hasErrors() && state.transmitError}
        header={getKey('register.form.error.title', messages)}
        content={getKey('register.form.error.message', messages)}
      />
      <p>{getKey('register.form.description', messages)}</p>
      <Segment>
        <Header dividing={true} as={'h2'}>
          {getKey('register.form.personalInfo', messages)}
        </Header>
        <Form.Group widths="equal">
          <Form.Field required={true} error={state.errors.firstName}>
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
              required={true}
              aria-invalid={state.errors.firstName}
              maxLength={255}
            />
          </Form.Field>
          <Form.Field required={true} error={state.errors.lastName}>
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
              required={true}
              aria-invalid={state.errors.lastName}
              maxLength={255}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field required={true} error={state.errors.club}>
          <label htmlFor="club">{getKey('register.form.club', messages)}</label>
          <input
            id="club"
            data-testid="club"
            name="club"
            placeholder={getKey('register.form.club.placeholder', messages)}
            value={state.club}
            onChange={handleChange}
            required={true}
            aria-invalid={state.errors.club}
            maxLength={255}
          />
        </Form.Field>
        <Form.Field required={true} error={state.errors.email}>
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
            required={true}
            aria-invalid={state.errors.email}
            aria-describedby={state.errors.email ? 'email-error' : undefined}
            type="email"
            maxLength={255}
            autoComplete="email"
          />
          <Message
            error={true}
            id="email-error"
            visible={state.errors.email}
            content={getKey('register.form.email.error.message', messages)}
          />
        </Form.Field>
        <Header dividing={true} as={'h3'}>
          {getKey('register.form.address', messages)}
        </Header>
        <Form.Group widths={16}>
          <Form.Field width={13} required={true} error={state.errors.street}>
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
              required={true}
              aria-invalid={state.errors.street}
              maxLength={255}
              autoComplete="street-address"
            />
          </Form.Field>
          <Form.Field width={3} required={true} error={state.errors.no}>
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
              required={true}
              aria-invalid={state.errors.no}
              maxLength={10}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field required={true} error={state.errors.npa}>
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
              required={true}
              aria-invalid={state.errors.npa}
              maxLength={255}
              type="number"
              autoComplete="postal-code"
            />
          </Form.Field>
          <Form.Field required={true} error={state.errors.locality}>
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
              required={true}
              aria-invalid={state.errors.locality}
              maxLength={255}
            />
          </Form.Field>
        </Form.Group>
      </Segment>
      <Segment>
        <Products
          setQuantity={handleChangeProduct}
          state={state}
          total={total}
        />
      </Segment>
      <Message
        data-testid="validation-error"
        error={true}
        visible={hasErrors()}
        content={getKey('register.form.validation.error', messages)}
      />
      <Message
        error={true}
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
