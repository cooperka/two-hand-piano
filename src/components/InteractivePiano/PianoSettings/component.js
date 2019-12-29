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
  useSavedKeyMap,
  useOneHandKeyMap,
  useTwoHandKeyMap,
}) {
  return (
    <div className="interactive-piano__piano-settings__wrapper">
      <SettingsButton
        text={isSettingKeyMap ? 'Finish configuring' : 'New custom key map'}
        onClick={isSettingKeyMap ? finishSettingKeyMap : startSettingKeyMap}
      />
      <SettingsButton text="Save current key map" onClick={persistKeyMap} />
      <SettingsButton text="Load saved key map" onClick={useSavedKeyMap} />
      <SettingsButton
        text="Load default: one-hand"
        onClick={useOneHandKeyMap}
      />
      <SettingsButton
        text="Load default: two-hand"
        onClick={useTwoHandKeyMap}
      />
    </div>
  );
}

export default PianoSettings;
