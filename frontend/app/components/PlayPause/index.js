import React from 'react';
import PropTypes from 'prop-types';

const PlayPause = ({ playing, onClick }) => (
  <button type="button" onClick={onClick}>
    {playing && (
      <svg width="43" height="49" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0h12v49H0V0zm20 0h12v49H20V0z"
          fill="#483547"
          fillRule="evenodd"
        />
      </svg>
    )}
    {!playing && (
      <svg width="43" height="49" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 49V0l43 24.5z" fill="#483547" fillRule="evenodd" />
      </svg>
    )}
  </button>
);

PlayPause.propTypes = {
  playing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlayPause;
