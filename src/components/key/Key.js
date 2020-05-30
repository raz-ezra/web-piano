import React from 'react';
import PropTypes from 'prop-types';
import './Key.css';

function Key({ note, handleClick, width, keyboardActive }) {
  const { type, id, prevBlacks, pitch } = note;

  return (
    <div
      className={'key ' + type}
      style={{
        left:
          type === 'black' ? width * id - width * prevBlacks - 15 : width * id - width * prevBlacks,
      }}
      onClick={() => handleClick(pitch)}
    >
      {keyboardActive ? note.key : ''}
    </div>
  );
}
Key.propTypes = {
  note: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  keyboardActive: PropTypes.bool.isRequired,
};

export default Key;
