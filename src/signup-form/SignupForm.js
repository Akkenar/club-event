import React from 'react';

import { Button, Form } from 'semantic-ui-react';

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
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default SignupForm;
