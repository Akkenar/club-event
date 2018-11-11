import React, { Fragment } from 'react';
import Loader from '../loader/Loader';
import { sendData } from './signup.service';
import SignupForm from './SignupForm';
import { goToTop, setFocusOnError } from '../page.lib';

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const PRICES = {
  dinner: 45,
  sleeping: 15,
  breakfast: 10,
  camping: 10,
  picknick: 10,
};

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      club: '',
      email: '',
      comment: '',
      meeting: '0',
      dinner: '0',
      sleeping: '0',
      camping: '0',
      picknick: '0',
      breakfast: '0',
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

  handleError() {
    this.setState({
      sending: false,
      success: false,
      transmitError: true,
    });
    goToTop();
  }

  handleSuccess({ result }) {
    if (result === 'success') {
      this.setState({
        sending: false,
        success: true,
        transmitError: false,
      });
    } else {
      this.handleError();
    }
  }

  handleSubmit() {
    if (this.validateForm()) {
      setFocusOnError();
      return;
    }

    this.setState({
      sending: true,
      transmitError: false,
    });

    const data = {
      ...this.state,
      recaptcha: grecaptcha.getResponse(),
      errors: undefined,
    };

    sendData(data)
      .then(this.handleSuccess, this.handleError)
      .catch(this.handleError);
  }

  validateForm() {
    const errors = {
      firstName: !this.state.firstName,
      lastName: !this.state.lastName,
      club: !this.state.club,
      meeting: !+this.state.meeting,
      email: !this.state.email || !this.state.email.match(emailRegex),
      recaptcha: !grecaptcha.getResponse(),
    };

    this.setState({
      errors,
    });

    return Object.keys(errors).some(key => errors[key]);
  }

  getTotal() {
    return (
      this.getPrice('dinner') +
      this.getPrice('sleeping') +
      this.getPrice('camping') +
      this.getPrice('picknick') +
      this.getPrice('breakfast')
    );
  }

  getPrice(name) {
    const value = this.state[name];
    return parseInt(value) * PRICES[name];
  }

  render() {
    return (
      <Fragment>
        {this.state.sending ? <Loader delay={0} /> : null}
        <SignupForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          total={this.getTotal()}
        />
      </Fragment>
    );
  }
}

export default SignupFormContainer;
