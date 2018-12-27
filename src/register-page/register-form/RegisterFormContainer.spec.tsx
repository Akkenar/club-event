import 'jest-dom/extend-expect';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, wait, waitForElement } from 'react-testing-library';
import RegisterFormContainer from './RegisterFormContainer';

// Mock the Google captcha
(window as any).grecaptcha = {
  getResponse: () => 'response',
  render: jest.fn(),
};

function mockResponse(result: any) {
  // Mock the fetch data as JSDom doesn't implement fetch.
  window.fetch = jest.fn(() =>
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
  breakfast: '1',
  camping: '1',
  club: 'Club',
  dinner: '1',
  email: 'foo@bar.ch',
  firstName: 'Foo',
  lastName: 'Bar',
  locality: 'Lausanne',
  no: '1',
  npa: '1018',
  picknick: '1',
  sleeping: '1',
  street: 'Rue de Lausanne',
  vegetarian: '1',
};

function setValidInputData({ getByTestId }: { getByTestId: any }) {
  Object.keys(validData).forEach((key: string) => {
    fireEvent.change(getByTestId(key), {
      // @ts-ignore
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
