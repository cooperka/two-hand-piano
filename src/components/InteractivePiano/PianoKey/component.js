import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import { text as textStyle } from '../styles';

function AccidentalKey({ isPlaying, isHighlighted, text, eventHandlers }) {
  const classes = useStyles();

  return (
    <div className={classes.accidentalWrapper}>
      <button
        className={classNames(classes.accidentalKey, {
          playing: isPlaying,
          highlighted: isHighlighted,
        })}
        {...eventHandlers}
      >
        <div className={classes.text}>{text}</div>
      </button>
    </div>
  );
}

function NaturalKey({ isPlaying, isHighlighted, text, eventHandlers }) {
  const classes = useStyles();

  return (
    <button
      className={classNames(classes.naturalKey, {
        playing: isPlaying,
        highlighted: isHighlighted,
      })}
      {...eventHandlers}
    >
      <div className={classes.text}>{text}</div>
    </button>
  );
}

function PianoKey({
  index,
  isNoteAccidental,
  isNotePlaying,
  startPlayingNote,
  stopPlayingNote,
  keyboardShortcuts,
  highlightedKeyIndex,
}) {
  function handleMouseEnter(event) {
    if (event.buttons) {
      startPlayingNote();
    }
  }

  const KeyComponent = isNoteAccidental ? AccidentalKey : NaturalKey;
  const eventHandlers = {
    onMouseDown: startPlayingNote,
    onMouseEnter: handleMouseEnter,
    onTouchStart: startPlayingNote,
    onMouseUp: stopPlayingNote,
    onMouseOut: stopPlayingNote,
    onTouchEnd: stopPlayingNote,
  };
  return (
    <KeyComponent
      isPlaying={isNotePlaying}
      isHighlighted={index === highlightedKeyIndex}
      text={keyboardShortcuts.join(' / ')}
      eventHandlers={eventHandlers}
    />
  );
}

const useStyles = makeStyles({
  accidentalWrapper: {
    position: 'relative',
    width: 0,
  },
  accidentalKey: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    cursor: 'pointer',
    background: '#444',
    width: 36,
    height: 120,
    borderRadius: '0 0 3px 3px',
    border: '3px solid #444',
    borderTop: 'none',
    boxSizing: 'border-box',
    padding: 5,
    outline: 'none',
    color: '#dbdbdb',
    '&.playing': {
      background: '#ed5276',
      color: '#fff',
    },
    '&.highlighted': {
      borderColor: '#66c',
      color: '#fff',
      '&:not(.playing)': {
        // Replace the regular color with highlight, still allowing background to be overridden while playing.
        background: '#66c',
      },
    },
  },
  naturalKey: {
    cursor: 'pointer',
    background: '#fafafa',
    width: 50,
    height: 180,
    margin: '0 2px',
    borderRadius: '0 0 3px 3px',
    border: 'none',
    padding: 10,
    outline: 'none',
    boxSizing: 'border-box',
    color: '#444',
    '&:firstOfType': {
      marginLeft: 0,
    },
    '&:lastOfType': {
      marginRight: 0,
    },
    '&.playing': {
      borderBottom: '10px solid #ed5276',
      color: '#ed5276',
    },
    '&.highlighted': {
      // Replace the regular AND playing color with highlight, still allowing border-bottom while playing.
      background: '#e0e0ff',
    },
  },
  text: textStyle,
});

export default PianoKey;
