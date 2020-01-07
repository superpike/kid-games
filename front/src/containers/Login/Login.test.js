import React from 'react';
import { render } from '@testing-library/react';
import { Login } from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Testing Login container', () => {
  const fakeLogin = jest.fn(data => data);
  const fakeLoginWithGithub = jest.fn(data => data);
  const fakeLoginWithFB = jest.fn(data => data);
  const fakeCancel = jest.fn(data => data);

  test('should match to snapshot', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

  describe('Buttons clicks', () => {
    test('should login', () => {
      const { getByTestId } = render(
        <Login login={fakeLogin} cancel={fakeCancel} />
      );
      const button = getByTestId('login');
      button.click();
      expect(fakeLogin).toHaveBeenCalledTimes(1);
    });
    test('should cancel login', () => {
      const { getByTestId } = render(
        <Login login={fakeLogin} cancel={fakeCancel} />
      );
      const button = getByTestId('cancel');
      button.click();
      expect(fakeCancel).toHaveBeenCalledTimes(1);
    });
    test('should login with github', () => {
      const { getByTestId } = render(
        <Login
          login={fakeLogin}
          loginWithGithub={fakeLoginWithGithub}
          cancel={fakeCancel}
        />
      );
      const button = getByTestId('loginWithGithub');
      button.click();
      expect(fakeLoginWithGithub).toHaveBeenCalledTimes(1);
    });
    test('should login with FB', () => {
      const { getByTestId } = render(
        <Login
          login={fakeLogin}
          loginWithFB={fakeLoginWithFB}
          cancel={fakeCancel}
        />
      );
      const button = getByTestId('loginWithFB');
      button.click();
      expect(fakeLoginWithFB).toHaveBeenCalledTimes(1);
    });
  });
});
