import React, { useState, Component } from 'react';
import Piano from 'react-piano-component';

import PianoKey from './PianoKey/component';
import PianoSettings from './PianoSettings/component';

import './styles.css';

const KEY_MAP_KEY = 'KEY_MAP';

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

function persistData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

class InteractivePiano extends Component {
  state = {
    keyMap: {},
    isSettingKeyMap: false,
    highlightedKeyIndex: null,
  };

  componentDidMount() {
    const fromStorage = JSON.parse(localStorage.getItem(KEY_MAP_KEY));
    this.setState({ keyMap: fromStorage || defaultKeyMap });
  }

  render() {
    const { keyMap, isSettingKeyMap, highlightedKeyIndex } = this.state;

    const startSettingKeyMap = () => {
      this.setState({
        keyMap: {},
        highlightedKeyIndex: 0,
        isSettingKeyMap: true,
      });
    };
    const finishSettingKeyMap = () => {
      this.setState({ highlightedKeyIndex: null, isSettingKeyMap: false });
    };
    const setNextKey = (getNoteAtIndex) => {
      const nextIndex = highlightedKeyIndex + 1;
      if (!getNoteAtIndex(nextIndex)) {
        finishSettingKeyMap();
        return;
      }
      this.setState({ highlightedKeyIndex: nextIndex });
    };
    const setKeyMapEntry = (key, note) => {
      this.setState({ keyMap: { ...keyMap, [key]: note } });
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
    const persistKeyMap = () => {
      persistData(KEY_MAP_KEY, keyMap);
    };

    return (
      <div>
        <PianoSettings
          startSettingKeyMap={startSettingKeyMap}
          finishSettingKeyMap={finishSettingKeyMap}
          persistKeyMap={persistKeyMap}
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
}

export default InteractivePiano;
