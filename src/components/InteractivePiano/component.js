import React, { useState } from 'react';
import Piano from 'react-piano-component';

import PianoKey from './PianoKey/component';
import PianoSettings from './PianoSettings/component';

import './styles.css';

const defaultKeyMap = {
  Q: 'C4',
  2: 'C#4',
  W: 'D4',
  3: 'D#4',
  E: 'E4',
  R: 'F4',
  5: 'F#4',
  T: 'G4',
  6: 'G#4',
  Y: 'A4',
  7: 'A#4',
  U: 'B4',
  V: 'C5',
  G: 'C#5',
  B: 'D5',
  H: 'D#5',
  N: 'E5',
  M: 'F5',
  K: 'F#5',
  ',': 'G5',
  L: 'G#5',
  '.': 'A5',
  ';': 'A#5',
  '/': 'B5',
};

function InteractivePiano() {
  const [keyMap, setKeyMap] = useState(defaultKeyMap);
  const [isSettingKeyMap, setIsSettingKeyMap] = useState(false);
  const [highlightedKeyIndex, setHighlightedKeyIndex] = useState(null);
  const startSettingKeyMap = () => {
    setKeyMap({});
    setHighlightedKeyIndex(0);
    setIsSettingKeyMap(true);
  };
  const finishSettingKeyMap = () => {
    setHighlightedKeyIndex(null);
    setIsSettingKeyMap(false);
  };
  const setNextKey = (getNoteAtIndex) => {
    const nextIndex = highlightedKeyIndex + 1;
    if (!getNoteAtIndex(nextIndex)) {
      finishSettingKeyMap();
      return;
    }
    setHighlightedKeyIndex(nextIndex);
  };
  const setKeyMapEntry = (key, note) => {
    setKeyMap({ ...keyMap, [key]: note });
  };
  const handleKeyDown = (
    key,
    note,
    startPlayingNote,
    stopPlayingNote,
    getNoteAtIndex,
  ) => {
    if (highlightedKeyIndex == null) return;

    const noteToAssign = getNoteAtIndex(highlightedKeyIndex);
    startPlayingNote(noteToAssign);
    setKeyMapEntry(key, noteToAssign);
    setNextKey(getNoteAtIndex);

    // For simplicity, just stop playing shortly after instead of listening for keyUp.
    setTimeout(() => stopPlayingNote(noteToAssign), 250);
  };

  return (
    <div>
      <PianoSettings
        startSettingKeyMap={startSettingKeyMap}
        finishSettingKeyMap={finishSettingKeyMap}
        isSettingKeyMap={isSettingKeyMap}
      />
      <div
        className="interactive-piano__piano-container"
        onMouseDown={(event) => event.preventDefault()}
      >
        <Piano
          startNote="C3"
          endNote="C6"
          renderPianoKey={PianoKey}
          pianoKeyProps={{ highlightedKeyIndex }}
          keyboardMap={keyMap}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default InteractivePiano;
