import styled from 'styled-components';

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

const ControlSt = styled.div`
  text-align: center;
`;

export { HomeSt, ResultsSt, ControlSt };
