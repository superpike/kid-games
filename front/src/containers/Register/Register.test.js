import React from 'react';
import { render } from '@testing-library/react';
import { Register } from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Testing Register container', () => {
  const fakeRegister = jest.fn(data => data);
  const fakeCancel = jest.fn(data => data);

  xtest('should match to snapshot', () => {
    const { container } = render(<Register />);
    expect(container).toMatchSnapshot();
  });

  describe('Buttons clicks', () => {
    xtest('should register', () => {
      const { getByTestId } = render(
        <Register register={fakeRegister} cancel={fakeCancel} />
      );
      const button = getByTestId('register');
      button.click();
      expect(fakeRegister).toHaveBeenCalledTimes(1);
    });
    xtest('should cancel registration', () => {
      const { getByTestId } = render(
        <Register register={fakeRegister} cancel={fakeCancel} />
      );
      const button = getByTestId('cancel');
      button.click();
      expect(fakeCancel).toHaveBeenCalledTimes(1);
    });
  });
});
