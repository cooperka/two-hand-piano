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
  isSettingKeyMap,
}) {
  const text = isSettingKeyMap ? 'Finish configuring' : 'Configure keys';

  return (
    <div className="interactive-piano__piano-settings__wrapper">
      <SettingsButton
        text={text}
        onClick={isSettingKeyMap ? finishSettingKeyMap : startSettingKeyMap}
      />
    </div>
  );
}

export default PianoSettings;
