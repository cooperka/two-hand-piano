import React, { Component } from 'react';
import Piano from 'react-piano-component';
import IconButton from '@material-ui/core/IconButton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { withStyles } from '@material-ui/core/styles';

import { oneHandDefault, twoHandDefault } from './keyMaps';
import PianoKey from './PianoKey/component';
import PianoSettings from './PianoSettings/component';
import ToneAudio from './ToneAudio/component';

const KEY_MAP_KEY = 'KEY_MAP';
const START_OCTAVE_KEY = 'START_OCTAVE';
const END_OCTAVE_KEY = 'END_OCTAVE';

const PIANO_LOWEST_NOTE = 'A';
const PIANO_LOWEST_OCTAVE = 0;
const PIANO_HIGHEST_NOTE = 'C';
const PIANO_HIGHEST_OCTAVE = 8;

const DEFAULT_START_OCTAVE = 2;
const DEFAULT_END_OCTAVE = 5;

function persistData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function retrieveData(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

class InteractivePiano extends Component {
  state = {
    startOctave: DEFAULT_START_OCTAVE,
    endOctave: DEFAULT_END_OCTAVE,
    keyMap: {},
    isSettingKeyMap: false,
    highlightedKeyIndex: null,
  };

  componentDidMount() {
    this.useSavedKeyMap();
  }

  useSavedKeyMap = () => {
    const storedKeyMap = retrieveData(KEY_MAP_KEY, twoHandDefault);
    const storedStartOctave = retrieveData(
      START_OCTAVE_KEY,
      DEFAULT_START_OCTAVE,
    );
    const storedEndOctave = retrieveData(END_OCTAVE_KEY, DEFAULT_END_OCTAVE);
    this.setState({
      keyMap: storedKeyMap,
      startOctave: storedStartOctave,
      endOctave: storedEndOctave,
    });
  };

  startSettingKeyMap = () => {
    this.setState({
      keyMap: {},
      highlightedKeyIndex: 0,
      isSettingKeyMap: true,
    });
  };

  finishSettingKeyMap = () => {
    this.setState({ highlightedKeyIndex: null, isSettingKeyMap: false });
  };

  setNextKey = (getNoteAtIndex) => {
    const { highlightedKeyIndex } = this.state;
    const nextIndex = highlightedKeyIndex + 1;
    if (!getNoteAtIndex(nextIndex)) {
      this.finishSettingKeyMap();
      return;
    }
    this.setState({ highlightedKeyIndex: nextIndex });
  };

  setKeyMapEntry = (key, note) => {
    const { keyMap } = this.state;
    this.setState({ keyMap: { ...keyMap, [key]: note } });
  };

  handleKeyDown = (
    key,
    note,
    startPlayingNote,
    stopPlayingNote,
    getNoteAtIndex,
  ) => {
    const { highlightedKeyIndex } = this.state;

    if (highlightedKeyIndex == null) return;

    const noteToAssign = getNoteAtIndex(highlightedKeyIndex);
    startPlayingNote(noteToAssign);
    this.setKeyMapEntry(key, noteToAssign);
    this.setNextKey(getNoteAtIndex);

    // For simplicity, just stop playing shortly after instead of listening for keyUp.
    setTimeout(() => stopPlayingNote(noteToAssign), 250);
  };

  persistKeyMap = () => {
    const { keyMap, startOctave, endOctave } = this.state;
    persistData(KEY_MAP_KEY, keyMap);
    persistData(START_OCTAVE_KEY, startOctave);
    persistData(END_OCTAVE_KEY, endOctave);
  };

  increaseStartOctave = (numOctaves) => {
    const { startOctave, endOctave } = this.state;
    const newStart = Math.min(
      // Don't go higher than (highest - 1).
      PIANO_HIGHEST_OCTAVE - 1,
      // Don't go lower than the lowest possible note.
      Math.max(PIANO_LOWEST_OCTAVE, startOctave - numOctaves),
    );
    const newEnd = newStart >= endOctave ? newStart + 1 : endOctave;
    this.setState({ startOctave: newStart, endOctave: newEnd });
  };

  increaseEndOctave = (numOctaves) => {
    const { startOctave, endOctave } = this.state;
    const newEnd = Math.max(
      // Don't go lower than (lowest + 1).
      PIANO_LOWEST_OCTAVE + 1,
      // Don't go higher than the highest possible note.
      Math.min(PIANO_HIGHEST_OCTAVE, endOctave + numOctaves),
    );
    const newStart = newEnd <= startOctave ? newEnd - 1 : startOctave;
    this.setState({ startOctave: newStart, endOctave: newEnd });
  };

  render() {
    const { classes } = this.props;
    const {
      startOctave,
      endOctave,
      keyMap,
      isSettingKeyMap,
      highlightedKeyIndex,
    } = this.state;

    return (
      <div>
        <PianoSettings
          startSettingKeyMap={this.startSettingKeyMap}
          finishSettingKeyMap={this.finishSettingKeyMap}
          persistKeyMap={this.persistKeyMap}
          isSettingKeyMap={isSettingKeyMap}
          useSavedKeyMap={this.useSavedKeyMap}
          useOneHandKeyMap={() => this.setState({ keyMap: oneHandDefault })}
          useTwoHandKeyMap={() => this.setState({ keyMap: twoHandDefault })}
        />
        <div
          role="none"
          className={classes.container}
          onMouseDown={(event) => event.preventDefault()}
        >
          <div className={classes.octaveBtnContainer}>
            <IconButton
              className={classes.flip}
              color="primary"
              disabled={startOctave <= PIANO_LOWEST_OCTAVE}
              onClick={() => this.increaseStartOctave(1)}
              aria-label="Increase start octave range"
            >
              <DoubleArrowIcon />
            </IconButton>
            <IconButton
              color="primary"
              disabled={startOctave >= PIANO_HIGHEST_OCTAVE - 1}
              onClick={() => this.increaseStartOctave(-1)}
              aria-label="Decrease start octave range"
            >
              <DoubleArrowIcon />
            </IconButton>
          </div>

          <Piano
            startNote={`${PIANO_LOWEST_NOTE}${startOctave}`}
            endNote={`${PIANO_HIGHEST_NOTE}${endOctave}`}
            renderPianoKey={PianoKey}
            pianoKeyProps={{ highlightedKeyIndex }}
            keyboardMap={keyMap}
            onKeyDown={this.handleKeyDown}
            renderAudio={ToneAudio}
          />

          <div className={classes.octaveBtnContainer}>
            <IconButton
              color="primary"
              disabled={endOctave >= PIANO_HIGHEST_OCTAVE}
              onClick={() => this.increaseEndOctave(1)}
              aria-label="Increase end octave range"
            >
              <DoubleArrowIcon />
            </IconButton>
            <IconButton
              className={classes.flip}
              color="primary"
              disabled={endOctave <= PIANO_LOWEST_OCTAVE + 1}
              onClick={() => this.increaseEndOctave(-1)}
              aria-label="Decrease end octave range"
            >
              <DoubleArrowIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'inline-flex',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
    borderTop: '10px solid #ed5276',
    position: 'relative',
    margin: 'auto',
    '& ::after': {
      content: '',
      width: '100%',
      height: 5,
      backgroundColor: 'rgba(68, 68, 68, 0.1)',
      position: 'absolute',
      top: 0,
    },
  },
  octaveBtnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 4,
  },
  flip: {
    transform: 'rotate(180deg)',
  },
};

export default withStyles(styles)(InteractivePiano);
