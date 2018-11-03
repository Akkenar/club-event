import React from 'react';

import { Button, Form } from 'semantic-ui-react';

const SignupForm = props => {
  return (
    <Form>
      <Form.Field>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" placeholder="First Name" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" placeholder="Last Name" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;
