import React, { Fragment } from 'react';

import { Button, Form, Message } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import getKey from '../intl/getKey';
import Loader from '../loader/Loader';
import { sendData } from './signup.service';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      sending: false,
      transmitError: false,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(state => ({
      [name]: value,
      errors: Object.assign({}, state.errors, { [name]: false }),
    }));
  }

  handleSubmit() {
    if (this.validateForm()) {
      this.setFocusOnError();
      return;
    }

    this.setState({
      sending: true,
      transmitError: false,
    });

    sendData(this.state).then(
      () => {
        this.setState({
          sending: false,
          success: true,
          transmitError: false,
        });
      },
      e => {
        console.error(e);
        this.setState({
          sending: false,
          success: false,
          transmitError: true,
        });
      }
    );
  }

  validateForm() {
    const errors = {
      firstName: !this.state.firstName,
      lastName: !this.state.lastName,
    };

    this.setState({
      errors,
    });

    return Object.keys(errors).some(key => errors[key]);
  }

  hasErrors() {
    const { errors } = this.state;
    return Object.keys(errors).some(key => errors[key]);
  }

  setFocusOnError() {
    setTimeout(() => {
      document.querySelector('*[aria-invalid="true"]').focus();
    }, 0);
  }

  render() {
    return (
      <Fragment>
        {this.state.sending ? <Loader delay={0} /> : null}
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Field required error={this.state.errors.firstName}>
            <label htmlFor="firstName">
              {getKey('register.form.firstName', this.props)}
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder={getKey(
                'register.form.firstName.placeholder',
                this.props
              )}
              value={this.state.firstName}
              onChange={this.handleChange}
              required
              aria-invalid={this.state.errors.firstName}
            />
          </Form.Field>
          <Form.Field required error={this.state.errors.lastName}>
            <label htmlFor="lastName">
              {getKey('register.form.lastName', this.props)}
            </label>
            <input
              id="lastName"
              name="lastName"
              placeholder={getKey(
                'register.form.lastName.placeholder',
                this.props
              )}
              value={this.state.lastName}
              onChange={this.handleChange}
              required
              aria-invalid={this.state.errors.lastName}
            />
          </Form.Field>
          <Message
            error
            visible={this.hasErrors()}
            content={getKey('register.form.validation.error', this.props)}
          />
          <Message
            error
            visible={!this.hasErrors() && this.state.transmitError}
            header={getKey('register.form.error.title', this.props)}
            content={getKey('register.form.error.message', this.props)}
          />
          <Button type="submit">
            {getKey('register.form.submit', this.props)}
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default injectIntl(SignupForm);
