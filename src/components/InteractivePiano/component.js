import React from 'react';
import Piano from 'react-piano-component';

import PianoKey from './PianoKey/component';
import PianoSettings from './PianoSettings/component';

import './styles.css';

function InteractivePiano() {
  return (
    <div>
      <PianoSettings />
      <div
        className="interactive-piano__piano-container"
        onMouseDown={(event) => event.preventDefault()}
      >
        <Piano
          startNote="C3"
          endNote="C6"
          renderPianoKey={PianoKey}
          keyboardMap={{
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
          }}
        />
      </div>
    </div>
  );
}

export default InteractivePiano;
