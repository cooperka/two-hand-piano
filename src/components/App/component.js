import React, { Component } from 'react';

import InteractivePiano from '../InteractivePiano/component';

import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InteractivePiano />
      </div>
    );
  }
}

export default App;
