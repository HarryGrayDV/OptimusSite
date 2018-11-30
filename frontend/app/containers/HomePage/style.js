import styled from 'styled-components';
import { colors } from '../../global-styles';

const HomeSt = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 64px;
`;

const ResultsSt = styled.div`
  position: relative;
  width: 1000px;
  height: 624px;
  background: #ffffff;
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.08);
  transform: translateX(-150px);
`;

const InsightsSt = styled.div`
  position: absolute;
  top: 24px;
  left: 100%;
  width: 300px;
  height: calc(100% - 48px);
  background-color: ${colors.tertiary};
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.08);
`;

export { HomeSt, ResultsSt, InsightsSt };
