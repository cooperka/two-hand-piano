import React from 'react';

import './styles.css';

function AccidentalKey({ isPlaying, text, eventHandlers }) {
  return (
    <div className="interactive-piano__accidental-key__wrapper">
      <button
        className={`interactive-piano__accidental-key ${
          isPlaying ? 'interactive-piano__accidental-key--playing' : ''
        }`}
        {...eventHandlers}
      >
        <div className="interactive-piano__text">{text}</div>
      </button>
    </div>
  );
}

function NaturalKey({ isPlaying, text, eventHandlers }) {
  return (
    <button
      className={`interactive-piano__natural-key ${
        isPlaying ? 'interactive-piano__natural-key--playing' : ''
      }`}
      {...eventHandlers}
    >
      <div className="interactive-piano__text">{text}</div>
    </button>
  );
}

function PianoKey({
  isNoteAccidental,
  isNotePlaying,
  startPlayingNote,
  stopPlayingNote,
  keyboardShortcuts,
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
      text={keyboardShortcuts.join(' / ')}
      eventHandlers={eventHandlers}
    />
  );
}

export default PianoKey;
