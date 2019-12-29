import React from 'react';

import './styles.css';

function SettingsButton({ text, onClick }) {
  return (
    <button className="interactive-piano__settings-button" onClick={onClick}>
      {text}
    </button>
  );
}

function PianoSettings({
  startSettingKeyMap,
  finishSettingKeyMap,
  persistKeyMap,
  isSettingKeyMap,
}) {
  return (
    <div className="interactive-piano__piano-settings__wrapper">
      <SettingsButton
        text={isSettingKeyMap ? 'Finish configuring' : 'Configure keys'}
        onClick={isSettingKeyMap ? finishSettingKeyMap : startSettingKeyMap}
      />
      <SettingsButton text="Save config" onClick={persistKeyMap} />
    </div>
  );
}

export default PianoSettings;
