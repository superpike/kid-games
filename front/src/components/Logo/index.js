import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { withTheme } from '../../HOC/withTheme';

import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => (props.theme === 'dark' ? '#07071f' : '#1c1c88')};
`;

export const Logo = ({ theme }) => {
  const { t } = useTranslation();
  return <Wrapper theme={theme}>{t('logoName')}</Wrapper>;
};

Logo.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default withTheme(Logo);
