import React from 'react';
import styled from 'styled-components';
import { colors } from '../../global-styles';

const HeaderSt = styled.header`
  display: flex;
  align-items: center;
  height: 68px;
  width: 100%;
  padding: 0 24px;
  color: #fff;
  background-image: ${colors.primaryGradient};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
`;

const Header = () => (
  <HeaderSt>
    <span>OptimusSite</span>
  </HeaderSt>
);

export default Header;
