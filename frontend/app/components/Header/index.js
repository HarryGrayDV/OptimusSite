/**
 *
 * Header
 *
 * Simple component for homepage navbar / header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../global-styles';

const HeaderSt = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
  color: #fff;
  background: ${props => (props.generic ? '#888' : colors.primaryGradient)};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  a {
    color: #fff;
  }
`;

const Header = ({ generic, children }) => (
  <HeaderSt generic={generic}>{children}</HeaderSt>
);

Header.defaultProps = {
  generic: false,
};

Header.propTypes = {
  generic: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Header;
