import React from 'react';
import { render, wait, waitForElement, fireEvent } from 'react-testing-library';
import RegisterFormContainer from './RegisterFormContainer';
import 'jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

// Mock the Google captcha
global.grecaptcha = {
  render: jest.fn(),
  getResponse: () => 'response',
};

function mockResponse(result) {
  // Mock the fetch data as JSDom doesn't implement fetch.
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () =>
        new Promise(resolve => {
          const mockResult = JSON.stringify({ result });
          setTimeout(() => {
            resolve(mockResult);
          }, 50);
        }),
    })
  );
}

const validData = {
  firstName: 'Foo',
  lastName: 'Bar',
  club: 'Club',
  email: 'foo@bar.ch',
  street: 'Rue de Lausanne',
  no: '1',
  npa: '1018',
  locality: 'Lausanne',
  dinner: '1',
  vegetarian: '1',
  sleeping: '1',
  camping: '1',
  picknick: '1',
  breakfast: '1',
};

function setValidInputData({ getByTestId }) {
  Object.keys(validData).forEach(key => {
    fireEvent.change(getByTestId(key), {
      target: { value: validData[key] },
    });
  });
}

const ContainerWithRouter = () => {
  return (
    <BrowserRouter>
      <RegisterFormContainer />
    </BrowserRouter>
  );
};

describe('RegisterFormContainer', () => {
  it('should match snapshot', () => {
    const wrapper = render(<RegisterFormContainer />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should add errors to all fields when the form is empty', () => {
    const wrapper = render(<RegisterFormContainer />);

    expect(wrapper.queryByTestId('validation-error')).not.toHaveClass(
      'visible'
    );
    wrapper.queryByText('register.form.submit').click();
    expect(wrapper.queryByTestId('validation-error')).toHaveClass('visible');
  });

  it('should send the form to the backend if valid', async () => {
    mockResponse('success');
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(wrapper);

    // Submit the form!
    wrapper.queryByText('register.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument()
    );

    // Should have been redirected.
  });

  it('should handle backend error', async () => {
    mockResponse('error');
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(wrapper);

    // Submit the form!
    wrapper.queryByText('register.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument()
    );

    expect(wrapper.queryByTestId('backend-error')).toHaveClass('visible');
  });
});
