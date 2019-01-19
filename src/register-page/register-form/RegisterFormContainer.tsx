import * as React from 'react';
import { Fragment } from 'react';
import { Results } from '../../core/api.type';
import LanguageContext from '../../core/intl/LanguageContext';
import Loader from '../../core/loader/Loader';
import { goToTop, setFocusOnError } from '../../core/page.lib';
import {
  getCaptchaResponse,
  resetCaptcha,
} from '../../core/recaptcha/recaptcha.lib';
import { setSimpleStore } from '../../core/simpleStore';
import { PRICES } from '../prices';
import { sendData } from '../register.service';
import {
  Errors,
  Products,
  Registration,
  RegistrationResult,
} from '../register.type';
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

  public handleChangeProduct(name: string, quantity: number) {
    const validQuantity = Math.min(100, Math.max(0, quantity));
    this.setState(state => ({
      products: { ...state.products, [name]: validQuantity },
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

  public handleSuccess(
    { result, total, reference }: RegistrationResult,
    data: Registration
  ) {
    // To be able to share data between pages.
    setSimpleStore({ ...data, total, reference });

    if (result === Results.SUCCESS) {
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
      resetCaptcha();
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
      total: this.getTotalError(),
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

  private getTotalError(): boolean {
    // PickNic is a special case as the price is 0. This isn't great
    // but gets us over the line.
    return !this.getTotalPrice() && !this.state.products.picknick;
  }
}

RegisterFormContainer.contextType = LanguageContext;

export default RegisterFormContainer;
