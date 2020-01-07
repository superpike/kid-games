import React from 'react';
import { render } from '@testing-library/react';
import { Auth } from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Testing Auth component', () => {
  const username = 'test user';
  const fakeLogin = jest.fn(data => data);
  const fakeRegister = jest.fn(data => data);
  const fakeLogout = jest.fn(data => data);

  describe('Is matched to snapshots', () => {
    test('should match to unlogged snapshot', () => {
      const { container } = render(<Auth />);
      expect(container).toMatchSnapshot();
    });
    test('should match to logged snapshot', () => {
      const { container } = render(<Auth username={username} />);
      expect(container).toMatchSnapshot();
    });
  });
  describe('Buttons clicks', () => {
    test('should start login process', () => {
      const { getByTestId } = render(
        <Auth login={fakeLogin} register={fakeRegister} />
      );
      const button = getByTestId('login');
      button.click();
      expect(fakeLogin).toHaveBeenCalledTimes(1);
    });
    test('should start register process', () => {
      const { getByTestId } = render(
        <Auth login={fakeLogin} register={fakeRegister} />
      );
      const button = getByTestId('register');
      button.click();
      expect(fakeRegister).toHaveBeenCalledTimes(1);
    });
    test('should start logout process', () => {
      const { getByTestId } = render(
        <Auth username={username} logout={fakeLogout} />
      );
      const button = getByTestId('logout');
      button.click();
      expect(fakeLogout).toHaveBeenCalledTimes(1);
    });
  });
});
