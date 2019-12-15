import React from 'react';
import { withLogger } from './withLogger';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const TestComponent = () => <></>;
const fakeLogger = jest.fn(data => data);

describe('Testing withLogger', () => {
  afterEach(() => {
    fakeLogger.mockClear();
  });
  test('should add log function', () => {
    const value = withLogger();
    expect(value).toBeFunction;
  });
  test('should add log function with specified params', () => {
    const WrappedComponent = withLogger({
      output: fakeLogger,
      lifecycles: [
        'didMount',
        'shouldUpdate',
        'didUpdate',
        'didUnmount',
      ],
    })(TestComponent);
    const { rerender, unmount } = render(<WrappedComponent />);
    expect(fakeLogger).toHaveBeenCalledTimes(1);
    rerender(<WrappedComponent qw="1" />);
    expect(fakeLogger).toHaveBeenCalledTimes(3);
    unmount(<WrappedComponent />);
    expect(fakeLogger).toHaveBeenCalledTimes(4);
    expect(fakeLogger).toHaveBeenNthCalledWith(
      1,
      'component mounted'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      2,
      'component should update'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      3,
      'component updated'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      4,
      'component will unmount'
    );
  });
  test('should add log function with specified HOC name', () => {
    const WrappedComponent = withLogger()(TestComponent);
    expect(WrappedComponent.displayName).toBe(
      'withLogger(TestComponent)'
    );
  });
  test('should log specified lifecycles', () => {
    const WrappedComponent = withLogger({
      output: fakeLogger,
      lifecycles: ['didMount', 'didUnmount'],
    })(TestComponent);
    const { unmount } = render(<WrappedComponent />);
    expect(fakeLogger).toHaveBeenCalledTimes(1);
    unmount(<WrappedComponent />);
    expect(fakeLogger).toHaveBeenCalledTimes(2);
    expect(fakeLogger).toHaveBeenNthCalledWith(
      1,
      'component mounted'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      2,
      'component will unmount'
    );
  });
  test('should log props', () => {
    const WrappedComponent = withLogger({
      output: fakeLogger,
      lifecycles: ['props'],
    })(TestComponent);
    const {} = render(<WrappedComponent q="1" w="erty" />);
    expect(fakeLogger).toHaveBeenCalledTimes(1);
    expect(fakeLogger).toHaveBeenNthCalledWith(1, {
      q: '1',
      w: 'erty',
    });
  });
  test('should log props first', () => {
    const WrappedComponent = withLogger({
      output: fakeLogger,
      lifecycles: ['props', 'didMount', 'shouldUpdate', 'didUnmount'],
    })(TestComponent);
    const { rerender, unmount } = render(
      <WrappedComponent q="1" w="erty" />
    );
    expect(fakeLogger).toHaveBeenCalledTimes(2);
    rerender(<WrappedComponent qw="1" />);
    expect(fakeLogger).toHaveBeenCalledTimes(4);
    unmount(<WrappedComponent />);
    expect(fakeLogger).toHaveBeenCalledTimes(5);
    expect(fakeLogger).toHaveBeenNthCalledWith(1, {
      q: '1',
      w: 'erty',
    });
    expect(fakeLogger).toHaveBeenNthCalledWith(
      2,
      'component mounted'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(3, {
      qw: '1',
    });
    expect(fakeLogger).toHaveBeenNthCalledWith(
      4,
      'component should update'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      5,
      'component will unmount'
    );
  });
});
