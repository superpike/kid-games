import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withLogger } from './withLogger';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const TestComponent = () => <></>;
const TestClassComponent = () => {
  const ComponentForTest = class MyClass extends Component {
    componentDidMount() {
      if (this.props.log) {
        this.props.log('inner component mounted');
      }
    }
    shouldComponentUpdate() {
      if (this.props.log) {
        this.props.log('inner component should update');
      }
      return true;
    }
    componentDidUpdate() {
      if (this.props.log) {
        this.props.log('inner component updated');
      }
    }
    componentWillUnmount() {
      if (this.props.log) {
        this.props.log('inner component will unmount');
      }
    }
    render() {
      return <></>;
    }
  };
  ComponentForTest.propsTypes = {
    log: PropTypes.func,
  };
  ComponentForTest.defaultProps = {
    log: () => {},
  };
  return ComponentForTest;
};
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
        'willUnmount',
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
      lifecycles: ['didMount', 'willUnmount'],
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
      lifecycles: [
        'props',
        'didMount',
        'shouldUpdate',
        'willUnmount',
      ],
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
  test('should add log function with specified params for class component', () => {
    const WrappedComponent = withLogger({
      output: fakeLogger,
      lifecycles: [
        'didMount',
        'shouldUpdate',
        'didUpdate',
        'willUnmount',
      ],
    })(TestClassComponent());
    const { rerender, unmount } = render(
      <WrappedComponent log={fakeLogger} />
    );
    expect(fakeLogger).toHaveBeenCalledTimes(2);
    rerender(<WrappedComponent log={fakeLogger} qw="1" />);
    expect(fakeLogger).toHaveBeenCalledTimes(6);
    unmount(<WrappedComponent log={fakeLogger} />);
    expect(fakeLogger).toHaveBeenCalledTimes(8);
    expect(fakeLogger).toHaveBeenNthCalledWith(
      1,
      'inner component mounted'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      2,
      'component mounted'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      3,
      'component should update'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      4,
      'inner component should update'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      5,
      'inner component updated'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      6,
      'component updated'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      7,
      'component will unmount'
    );
    expect(fakeLogger).toHaveBeenNthCalledWith(
      8,
      'inner component will unmount'
    );
  });
});
