import React, { useState, useEffect } from 'react';
import Key from './key/Key';
import './App.css';
import MIDISounds from 'midi-sounds-react';
import Controls from './controls/Controls';
import KeyboardEventHandler from 'react-keyboard-event-handler';

function App() {
  const [numOfNotes, setNumOfNotes] = useState(13);
  const [startingNote, setStartingNote] = useState(60);
  const [sound, setSound] = useState(3);
  const [midiSounds, setMidiSounds] = useState();
  const [notes, setNotes] = useState([]);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const w = 50;
  const noteLength = 1;

  useEffect(() => {
    setNotes(setNotesArray(numOfNotes, startingNote, startingNote % 12));
  }, [numOfNotes, startingNote, midiSounds]);

  function playNote(note) {
    midiSounds.setInstrumentVolume(sound, 0.5);
    midiSounds.playChordNow(sound, [note], noteLength);
  }

  function addNotes(isAdd) {
    if (isAdd) {
      if (numOfNotes < 49) {
        setNumOfNotes(numOfNotes + 1);
      } else {
        alert('Maximum number of notes');
      }
    } else {
      if (numOfNotes > 13) {
        setNumOfNotes(numOfNotes - 1);
      } else {
        alert('Minimum number of notes');
      }
    }
  }

  function changeOctaves(isUp) {
    if (isUp) {
      setStartingNote(startingNote + 12);
    } else {
      setStartingNote(startingNote - 12);
    }
  }

  function changeStart(event) {
    setStartingNote(parseInt(event.target.value) + 60);
  }

  function changeSound(event) {
    setSound(parseInt(event.target.value));
  }

  function handleKey(key) {
    if (keyboardActive) {
      playNote(notes.find(note => key === note.key).pitch);
    }
  }

  function activateKeyboard() {
    setKeyboardActive(!keyboardActive);
  }

  return (
    <>
      {midiSounds ? (
        <Controls
          actions={{ addNotes, changeOctaves, changeStart, changeSound, activateKeyboard }}
          midiSounds={midiSounds}
          startingNote={startingNote}
          sound={sound}
          keyboardActive={keyboardActive}
        />
      ) : (
        ''
      )}
      <div className='piano' style={{ width: getPianoWidth(notes, w) }} onKeyPress={handleKey}>
        {notes.map(note => {
          return (
            <Key
              key={note.id}
              note={note}
              handleClick={playNote}
              width={w}
              lable={note.key}
              keyboardActive={keyboardActive}
            />
          );
        })}
        <MIDISounds ref={ref => setMidiSounds(ref)} appElementName='app' instruments={[3]} />
        <KeyboardEventHandler handleKeys={keyTemplate} onKeyEvent={key => handleKey(key)} />
      </div>
    </>
  );
}

export default App;

const noteTypes = {
  0: 'white',
  1: 'black',
};

const pianoTemplate = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
const keyTemplate = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k'];

function countBlacks(keyNum, startPosition) {
  let numOfBlacks = 0;
  for (let i = 0; i < keyNum; i++) {
    if (pianoTemplate[(i + startPosition) % 12] === 1) numOfBlacks++;
  }
  return numOfBlacks;
}

function setNotesArray(numOfNotes, startingPitch, startPosition) {
  let notes = [];
  for (let i = 0; i < numOfNotes; i++) {
    notes.push({
      id: i,
      type: noteTypes[pianoTemplate[(i + startPosition) % 12]],
      pitch: startingPitch + i,
      prevBlacks: i !== 0 ? countBlacks(i, startPosition) : 0,
      key: i < 13 ? keyTemplate[i] : null,
    });
  }
  return notes;
}

function getPianoWidth(notes, w) {
  let width = 0;
  notes.forEach(note => {
    if (note.type === 'white') width += w;
  });
  return width;
}
