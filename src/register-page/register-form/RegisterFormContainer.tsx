import * as React from 'react';
import { Fragment } from 'react';
import LanguageContext from '../../core/intl/LanguageContext';
import Loader from '../../core/loader/Loader';
import { goToTop, setFocusOnError } from '../../core/page.lib';
import { setSimpleStore } from '../../core/simpleStore';
import { PRICES } from './prices';
import { sendData } from './register.service';
import { Errors, Products, Registration } from './register.type';
import RegisterForm from './RegisterForm';

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const DEFAULT_STATE = {
  club: '',
  email: '',
  errors: {},
  firstName: '',
  lastName: '',
  locality: '',
  no: '',
  npa: '',
  products: {},
  sending: false,
  street: '',
  transmitError: false,
};

export interface RegisterFormContainerState {
  club: string;
  email: string;
  errors: Errors;
  firstName: string;
  lastName: string;
  locality: string;
  no: string;
  npa: string;
  products: Products;
  sending: boolean;
  street: string;
  transmitError: boolean;
  success?: boolean;
  [key: string]: any;
}

function getCaptchaResponse() {
  const noCaptcha = window.location.href.includes('ignoreCaptcha');
  if (noCaptcha || typeof (window as any).grecaptcha === 'undefined') {
    return 'no-captcha';
  }
  return (window as any).grecaptcha.getResponse();
}

class RegisterFormContainer extends React.Component<
  any,
  RegisterFormContainerState
> {
  constructor(props: any) {
    super(props);

    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  public handleChange(event: any) {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    const errors: Errors = { [name]: false };

    this.setState(state => ({
      [name]: value,
      // Override any error with this name.
      errors: { ...state.errors, ...errors },
    }));
  }

  public handleChangeProduct(event: any) {
    const { target } = event;
    const { name } = target;

    this.setState(state => ({
      products: { ...state.products, [name]: target.value },
    }));
  }

  public handleError() {
    this.setState({
      sending: false,
      success: false,
      transmitError: true,
    });
    goToTop();
  }

  public handleSuccess({ result, total, reference }: any, data: any) {
    // To be able to share data between pages.
    setSimpleStore({ ...data, total, reference });

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

  public handleSubmit() {
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
      .then(result => this.handleSuccess(result, data), this.handleError)
      .catch(this.handleError);
  }

  public getFormData(): Registration {
    return {
      ...this.state,
      language: this.context.language,
      recaptcha: getCaptchaResponse(),
    };
  }

  public validateForm(): boolean {
    const errors: { [key: string]: boolean } = {
      club: !this.state.club,
      email: !this.state.email || !this.state.email.match(emailRegex),
      firstName: !this.state.firstName,
      lastName: !this.state.lastName,
      locality: !this.state.locality,
      no: !this.state.no,
      npa: !this.state.npa,
      recaptcha: !getCaptchaResponse(),
      street: !this.state.street,
      total: !this.getTotalPrice(),
    };

    this.setState({
      errors,
    });

    return Object.keys(errors).some(key => errors[key]);
  }

  public getTotalPrice() {
    return Object.keys(this.state.products).reduce((total, itemName) => {
      const value = this.state.products[itemName] as string;
      const itemPrice = PRICES[itemName] as number;
      return total + parseInt(value, 10) * itemPrice;
    }, 0);
  }

  public render() {
    return (
      <Fragment>
        {this.state.sending ? <Loader /> : null}
        <RegisterForm
          state={this.state}
          handleChange={this.handleChange}
          handleChangeProduct={this.handleChangeProduct}
          handleSubmit={this.handleSubmit}
          total={this.getTotalPrice()}
        />
      </Fragment>
    );
  }
}

RegisterFormContainer.contextType = LanguageContext;

export default RegisterFormContainer;
