import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './styles.css';

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
      <ButtonGroup
        color="primary"
        className="interactive-piano__settings-group"
      >
        <Button
          onClick={isSettingKeyMap ? finishSettingKeyMap : startSettingKeyMap}
        >
          {isSettingKeyMap ? 'Finish configuring' : 'New custom key map'}
        </Button>
        <Button onClick={persistKeyMap}>Save current key map</Button>
      </ButtonGroup>
      <ButtonGroup
        color="primary"
        className="interactive-piano__settings-group"
      >
        <Button onClick={useSavedKeyMap}>Load saved key map</Button>
        <Button onClick={useOneHandKeyMap}>Load default: one-hand</Button>
        <Button onClick={useTwoHandKeyMap}>Load default: two-hand</Button>
      </ButtonGroup>
    </div>
  );
}

export default PianoSettings;
