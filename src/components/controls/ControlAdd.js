import React from 'react';
import PropTypes from 'prop-types';

function ControlAdd({ label, onClick, displayText, text }) {
  return (
    <div className={'control add'}>
      {label}:<button onClick={() => onClick(true)}>+</button>
      {displayText ? <div className='octaveNumber'>{text}</div> : ''}
      <button onClick={() => onClick(false)}>-</button>
    </div>
  );
}
ControlAdd.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  displayText: PropTypes.bool,
  text: PropTypes.number,
};

export default ControlAdd;
