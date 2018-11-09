import React, { Fragment } from 'react';
import Loader from '../loader/Loader';
import { sendData } from './signup.service';
import SignupForm from './SignupForm';

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const PRICES = {
  dinner: 45,
  sleeping: 15,
  breakfast: 10,
  camping: 10,
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
      dinner: '0',
      sleeping: '0',
      camping: '0',
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
    const errorNameAttr = target.attributes['data-errorname'];
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const errorName = errorNameAttr ? errorNameAttr.value : name;

    this.setState(state => ({
      [name]: value,
      errors: Object.assign({}, state.errors, { [errorName]: false }),
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

    const data = { ...this.state, errors: undefined };
    sendData(data).then(
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
      club: !this.state.club,
      email: !this.state.email || !this.state.email.match(emailRegex),
      counts: !this.getTotal(),
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

  getTotal() {
    return (
      this.getPrice('dinner') +
      this.getPrice('sleeping') +
      this.getPrice('camping') +
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
