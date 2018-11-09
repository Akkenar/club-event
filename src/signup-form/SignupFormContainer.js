import React, { Fragment } from 'react';
import Loader from '../loader/Loader';
import { sendData } from './signup.service';
import SignupForm from './SignupForm';

class SignupFormContainer extends React.Component {
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

  setFocusOnError() {
    setTimeout(() => {
      document.querySelector('*[aria-invalid="true"]').focus();
    }, 0);
  }

  render() {
    return (
      <Fragment>
        {this.state.sending ? <Loader delay={0} /> : null}
        <SignupForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }
}

export default SignupFormContainer;
