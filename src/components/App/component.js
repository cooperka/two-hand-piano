import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InteractivePiano from '../InteractivePiano/component';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <InteractivePiano />
      <div className={classes.footer}>
        <div>
          &copy; 2020 Kevin Cooper &bull;{' '}
          <a href="https://github.com/cooperka/two-hand-piano">View source</a>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 40,
    fontSize: 12,
  },
});

export default App;
