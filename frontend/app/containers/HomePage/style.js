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
  transform: translateX(-150px);
`;

const ResultSt = styled.div`
  width: 900px;
  height: 600px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const InsightsSt = styled.div`
  position: absolute;
  top: 24px;
  left: 100%;
  width: 300px;
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  background-color: ${colors.tertiary};
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  padding: 24px;

  h2 {
    margin-top: 0;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style-type: none;
    padding: 0;
    margin: 0;

    hr {
      opacity: 0.2;
    }
  }
`;

const ControlSt = styled.div`
  text-align: center;
`;

export { HomeSt, ResultsSt, ResultSt, InsightsSt, ControlSt };
