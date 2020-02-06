import React from 'react';
import { useTheme } from '../../context/themeContext';

// import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin: 5px auto;
`;

const BackGround = styled.div`
  width: 50px;
  height: 26px;
  border-radius: 26px;
  position: relative;
  outline: none;
  background-color: ${props =>
    props.theme === 'dark' ? '#555' : '#ccc'};
  border: 1px solid
    ${props => (props.theme === 'dark' ? '#ccc' : '#555')};
`;

const Switcher = styled.div`
  position: absolute;
  z-index: 5;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.theme === 'dark' ? 'left: 3px' : 'right: 3px')};
  background-color: ${props =>
    props.theme === 'dark' ? '#ccc' : '#555'};
`;

const ThemeChanger = () => {
  const { theme, changeTheme } = useTheme();
  return (
    <Wrapper>
      <BackGround
        theme={theme}
        onClick={() => changeTheme(theme)}
        onKeyPress={() => {}}
        role="button"
        tabIndex="0"
      >
        <Switcher theme={theme} />
      </BackGround>
    </Wrapper>
  );
};

export default ThemeChanger;
