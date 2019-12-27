import React from 'react';

import './styles.css';

function SettingsButton({ text, onClick }) {
  return (
    <button className="interactive-piano__settings-button" onClick={onClick}>
      {text}
    </button>
  );
}

function PianoSettings() {
  return (
    <div className="interactive-piano__piano-settings__wrapper">
      <SettingsButton
        text="Configure keys"
        onClick={() => {
          console.log('Configure keys');
        }}
      />
    </div>
  );
}

export default PianoSettings;
