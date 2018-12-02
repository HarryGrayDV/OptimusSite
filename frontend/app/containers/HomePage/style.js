import styled from 'styled-components';
import { media, colors } from '../../global-styles';

const HomeSt = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 64px;

  .ctd {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 3;
    padding: 12px;
    color: #fff;
    background-color: ${colors.tertiary};
  }

  ${media.projector`
    padding: 32px;
  `};
`;

const ResultsSt = styled.div`
  position: relative;
  transform: ${props =>
    props.playing ? 'translateX(0)' : 'translateX(-150px)'};
  transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);

  ${media.projector`
  transform: ${props =>
    props.playing ? 'translateX(0)' : 'translateX(-100px)'};
  `};
`;

const ControlSt = styled.div`
  text-align: center;
`;

export { HomeSt, ResultsSt, ControlSt };
