import React from 'react';
import classNames from 'classnames';

import './styles.css';

function AccidentalKey({ isPlaying, isHighlighted, text, eventHandlers }) {
  return (
    <div className="interactive-piano__accidental-key__wrapper">
      <button
        className={classNames('interactive-piano__accidental-key', {
          'interactive-piano__accidental-key--playing': isPlaying,
          'interactive-piano__accidental-key--highlighted': isHighlighted,
        })}
        {...eventHandlers}
      >
        <div className="interactive-piano__text">{text}</div>
      </button>
    </div>
  );
}

function NaturalKey({ isPlaying, isHighlighted, text, eventHandlers }) {
  return (
    <button
      className={classNames('interactive-piano__natural-key', {
        'interactive-piano__natural-key--playing': isPlaying,
        'interactive-piano__natural-key--highlighted': isHighlighted,
      })}
      {...eventHandlers}
    >
      <div className="interactive-piano__text">{text}</div>
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

export default PianoKey;
