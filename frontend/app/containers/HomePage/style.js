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
  transform: ${props =>
    props.playing ? 'translateX(0)' : 'translateX(-150px)'};
  transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
`;

const ResultSt = styled.div`
  position: relative;
  width: 900px;
  height: 600px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.15);
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 2px solid ${colors.tertiary};
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
  transform: ${props =>
    props.playing ? 'translateX(-320px)' : 'translateX(0)'};
  transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;

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
