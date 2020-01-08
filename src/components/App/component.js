import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InteractivePiano from '../InteractivePiano/component';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <InteractivePiano />
    </div>
  );
}

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
  },
});

export default App;
