import React from 'react';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '@fontsource/roboto';

import theme from '../../theme';
import InteractivePiano from '../InteractivePiano/component';

const muiTheme = createMuiTheme(theme);

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.wrapper}>
        <CssBaseline />
        <InteractivePiano />
        <div className={classes.footer}>
          <div>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            &copy; 2020 Kevin Cooper &bull;{' '}
            <a href="https://github.com/cooperka/two-hand-piano">View source</a>
          </div>
        </div>
      </div>
    </ThemeProvider>
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
