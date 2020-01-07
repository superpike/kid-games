import React from 'react';
import { render } from '@testing-library/react';
import { Login } from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Testing Login container', () => {
  const fakeLogin = jest.fn(data => data);
  const fakeCancel = jest.fn(data => data);

  xtest('should match to snapshot', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });

  describe('Buttons clicks', () => {
    xtest('should login', () => {
      const { getByTestId } = render(
        <Login login={fakeLogin} cancel={fakeCancel} />
      );
      const button = getByTestId('login');
      button.click();
      expect(fakeLogin).toHaveBeenCalledTimes(1);
    });
    xtest('should cancel login', () => {
      const { getByTestId } = render(
        <Login login={fakeLogin} cancel={fakeCancel} />
      );
      const button = getByTestId('cancel');
      button.click();
      expect(fakeCancel).toHaveBeenCalledTimes(1);
    });
  });
});
