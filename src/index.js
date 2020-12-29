import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { env } from './constants';
import App from './components/App/component';

import './styles.css';

if (!env.IS_STATIC) {
  const target = document.getElementById('root');

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render;

  const render = (Comp) => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      target,
    );
  };

  render(App);

  // Enable Hot Module Replacement (HMR).
  if (module && module.hot) {
    module.hot.accept('./components/App/component', () => {
      render(App);
    });
  }
}

// Export top-level component as JSX (for static rendering).
export default App;
