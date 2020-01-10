import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

function PianoSettings({
  startSettingKeyMap,
  finishSettingKeyMap,
  persistKeyMap,
  isSettingKeyMap,
  useSavedKeyMap,
  useOneHandKeyMap,
  useTwoHandKeyMap,
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ButtonGroup color="primary" className={classes.btnGroup}>
        <Button
          onClick={isSettingKeyMap ? finishSettingKeyMap : startSettingKeyMap}
        >
          {isSettingKeyMap ? 'Finish configuring' : 'New custom key map'}
        </Button>
        <Button onClick={persistKeyMap}>Save current key map</Button>
      </ButtonGroup>
      <ButtonGroup color="primary" className={classes.btnGroup}>
        <Button onClick={useSavedKeyMap}>Load saved key map</Button>
        <Button onClick={useOneHandKeyMap}>Load default: one-hand</Button>
        <Button onClick={useTwoHandKeyMap}>Load default: two-hand</Button>
      </ButtonGroup>
    </div>
  );
}

const useStyles = makeStyles({
  wrapper: {
    margin: 4,
  },
  btnGroup: {
    margin: 4,
  },
});

export default PianoSettings;
