import React, { Fragment } from 'react';
import Loader from '../loader/Loader';
import { sendData } from './signup.service';
import SignupForm from './SignupForm';
import { goToTop, setFocusOnError } from '../page.lib';
import { PRICES } from './prices';
import LanguageContext from '../intl/LanguageContext';
import { setSimpleStore } from '../simpleStore';

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const DEFAULT_STATE = {
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

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
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

  handleSuccess({ result, total, reference }) {
    // To be able to share data between pages.
    setSimpleStore({
      total,
      reference,
    });

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

    const data = this.getFormData();

    sendData(data)
      .then(this.handleSuccess, this.handleError)
      .catch(this.handleError);
  }

  getFormData() {
    return {
      ...this.state,
      language: this.context.language,
      recaptcha: grecaptcha.getResponse(),
      errors: undefined,
    };
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

  getTotalPrice() {
    return (
      this.getPriceForItem('dinner') +
      this.getPriceForItem('sleeping') +
      this.getPriceForItem('camping') +
      this.getPriceForItem('picknick') +
      this.getPriceForItem('breakfast')
    );
  }

  getPriceForItem(name) {
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
          total={this.getTotalPrice()}
        />
      </Fragment>
    );
  }
}

SignupFormContainer.contextType = LanguageContext;

export default SignupFormContainer;
