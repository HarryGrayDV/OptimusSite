/**
 *
 * Slider
 *
 * Timeline slider for displaying models over time
 * TODO: manual click and drag control
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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
  left: ${props => props.pos}%;
  transform: translateX(-50%);
  top: calc(4px - 20px);
  width: 18px;
  height: 40px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  transition: left 1.5s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: default;
  outline: none;

  .label {
    position: absolute;
    top: -24px;
    transform: translateX(-50%);
    font-family: 'Menlo', monospace;
    color: ${colors.tertiary};
    white-space: nowrap;
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

class Slider extends React.PureComponent {
  constructor() {
    super();

    this.controlRef = React.createRef();
  }

  render() {
    const { pos } = this.props;

    return (
      <SliderSt>
        <span>START</span>
        <SliderControlSt pos={pos} type="button" ref={this.controlRef}>
          <div className="shadows" />
        </SliderControlSt>
        <span>LATEST</span>
      </SliderSt>
    );
  }
}

Slider.propTypes = {
  pos: PropTypes.number.isRequired,
};

export default Slider;
