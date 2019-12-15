import React, { Component } from 'react';

const getDisplayName = SomeComponent => {
  return (
    SomeComponent.displayName || SomeComponent.name || 'Component'
  );
};

export const withLogger = (params = {}) => {
  const { output, lifecycles = [] } = params;
  const logProps = lifecycles.findIndex(el => el === 'props') !== -1;
  const logDidMount =
    lifecycles.findIndex(el => el === 'didMount') !== -1;
  const logShouldUpdate =
    lifecycles.findIndex(el => el === 'shouldUpdate') !== -1;
  const logDidUpdate =
    lifecycles.findIndex(el => el === 'didUpdate') !== -1;
  const logDidUnmount =
    lifecycles.findIndex(el => el === 'didUnmount') !== -1;
  const log = data => {
    if (output) {
      return output(data);
    }
    console.log(data);
  };

  return ComponentToWrap => {
    const WrappedComponent = class MyClass extends Component {
      componentDidMount() {
        if (logProps) {
          log(this.props);
        }
        if (logDidMount) {
          log('component mounted');
        }
      }
      shouldComponentUpdate(nextProps) {
        if (logProps) {
          log(nextProps);
        }
        if (logShouldUpdate) {
          log('component should update');
        }
        return true;
      }
      componentDidUpdate() {
        if (logDidUpdate) {
          log('component updated');
        }
      }
      componentWillUnmount() {
        if (logDidUnmount) {
          log('component will unmount');
        }
      }
      render() {
        return <ComponentToWrap {...this.props} />;
      }
    };
    WrappedComponent.displayName = `withLogger(${getDisplayName(
      ComponentToWrap
    )})`;
    return WrappedComponent;
  };
};

export default withLogger;
