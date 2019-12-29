import React, { Component } from 'react';
import Piano from 'react-piano-component';

import { oneHandDefault, twoHandDefault } from './keyMaps';
import PianoKey from './PianoKey/component';
import PianoSettings from './PianoSettings/component';
import ToneAudio from './ToneAudio/component';

import './styles.css';

const KEY_MAP_KEY = 'KEY_MAP';

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
    this.useSavedKeyMap();
  }

  useSavedKeyMap = () => {
    const fromStorage = JSON.parse(localStorage.getItem(KEY_MAP_KEY));
    this.setState({ keyMap: fromStorage || twoHandDefault });
  };

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
          useSavedKeyMap={this.useSavedKeyMap}
          useOneHandKeyMap={() => this.setState({ keyMap: oneHandDefault })}
          useTwoHandKeyMap={() => this.setState({ keyMap: twoHandDefault })}
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
            renderAudio={ToneAudio}
          />
        </div>
      </div>
    );
  }
}

export default InteractivePiano;
