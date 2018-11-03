import React from 'react';

import { Button, Form } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import getKey from '../intl/getKey';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { firstName: '', lastName: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
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
          />
        </Form.Field>
        <Form.Field>
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
          />
        </Form.Field>
        <Button type="submit">
          {getKey('register.form.submit', this.props)}
        </Button>
      </Form>
    );
  }
}

export default injectIntl(SignupForm);
