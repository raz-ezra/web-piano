import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ControlAdd from './ControlAdd';

function Controls({ actions, midiSounds, startingNote, sound, keyboardActive }) {
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    setSounds(midiSounds.player.loader.instrumentKeys());
  }, []);
  return (
    <div className='controls'>
      <ControlAdd label='Piano Size' onClick={actions.addNotes} />
      <div className='control select startingNote'>
        Start Note:
        <select value={startingNote % 12} onChange={actions.changeStart}>
          {Object.keys(noteNames).map(pitch => {
            return (
              <option key={pitch} value={pitch}>
                {noteNames[pitch]}
              </option>
            );
          })}
        </select>
      </div>
      <ControlAdd
        label='Octave'
        onClick={actions.changeOctaves}
        displayText={true}
        text={Math.trunc(startingNote / 12) - 5}
      />
      <div className='control select sound'>
        Sound:
        <select value={sound} onChange={actions.changeSound}>
          {sounds
            ? sounds.map((sound, i) => {
                return (
                  <option key={i} value={i}>
                    {sound.substring(0, 4) +
                      ': ' +
                      midiSounds.player.loader.instrumentInfo(i).title}
                  </option>
                );
              })
            : ''}
        </select>
      </div>
      <div className='control checkbox'>
        Activate Keyboard:
        <input type='checkbox' checked={keyboardActive} onChange={actions.activateKeyboard} />
      </div>
    </div>
  );
}
Controls.propTypes = {
  actions: PropTypes.object.isRequired,
  midiSounds: PropTypes.object.isRequired,
  startingNote: PropTypes.number.isRequired,
  sound: PropTypes.number.isRequired,
  keyboardActive: PropTypes.bool.isRequired,
};

export default Controls;

const noteNames = {
  0: 'C',
  1: 'C#/Db',
  2: 'D',
  3: 'D#/Eb',
  4: 'E',
  5: 'F',
  6: 'F#/Gb',
  7: 'G',
  8: 'G#/Ab',
  9: 'A',
  10: 'A#/Bb',
  11: 'B',
};
