import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: 20px;
`;

const InputElement = styled.input`
  outline: none;
  display: block;
  border: ${props => (props.error ? '1px solid red' : 'none')};
  border-radius: 3px;
  padding: 5px;
`;

const Label = styled.label`
  text-align: left;
  margin-bottom: 10px;
  display: block;
  font-style: italic;
  color: ${props => (props.error ? 'red' : 'white')};
`;

const Error = styled.div`
  font-size: 12px;
  color: red;
  text-align: left;
  margin: 5px;
  position: absolute;
  left: 0;
  top: 90%;
`;

const Input = ({
  changed,
  label,
  error,
  noTextError,
  pressed,
  name,
  value,
  type,
}) => {
  return (
    <Wrapper>
      {label ? (
        <Label error={error && !noTextError} htmlFor={name}>
          {label}
        </Label>
      ) : null}
      <InputElement
        onChange={changed}
        onKeyPress={pressed}
        name={name}
        value={value}
        type={type}
        error={error && !noTextError}
      />
      {error && !noTextError ? <Error>{error}</Error> : null}
    </Wrapper>
  );
};

Input.propTypes = {
  changed: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  noTextError: PropTypes.bool,
  pressed: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  error: '',
  noTextError: false,
  pressed: () => {},
  value: '',
  type: 'text',
};

export default Input;
