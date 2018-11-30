import React from 'react';
import styled from 'styled-components';
import { colors } from '../../global-styles';

const SliderSt = styled.div`
  position: relative;
  height: 8px;
  width: 500px;
  margin: 64px auto 32px;
  border-radius: 100px;
  background: ${colors.primaryGradient};

  > span {
    position: absolute;
    top: calc(100% + 18px);
    letter-spacing: 2px;
    color: ${colors.tertiary};
    opacity: 0.4;

    &:first-of-type {
      left: 0;
      transform: translateX(-50%);
    }

    &:last-of-type {
      right: 0;
      transform: translateX(50%);
    }
  }
`;

const SliderControlSt = styled.button`
  position: absolute;
  left: 0;
  top: calc(4px - 20px);
  width: 18px;
  height: 40px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  .label {
    position: absolute;
    top: -24px;
    transform: translateX(-50%);
    font-family: 'Menlo', monospace;
    color: ${colors.tertiary};
  }

  .shadows {
    position: absolute;
    top: 4px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 8px);
    border-radius: 6px;
    background-image: linear-gradient(-180deg, #f2f2f2 0%, #d7d7d7 100%);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-radius: 5px;
      background-image: radial-gradient(100% 50%, #f8f8f8 24%, #e8e8e8 100%);
    }
  }
`;

const Slider = () => (
  <SliderSt>
    <span>START</span>
    <SliderControlSt type="button">
      <span className="label">16:23</span>
      <div className="shadows" />
    </SliderControlSt>
    <span>LATEST</span>
  </SliderSt>
);

export default Slider;
