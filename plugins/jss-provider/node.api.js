import { ServerStyleSheets } from '@material-ui/core';

export default () => ({
  beforeRenderToHtml: (App, { meta }) => {
    // eslint-disable-next-line no-param-reassign
    meta.muiSheets = new ServerStyleSheets();
    return meta.muiSheets.collect(App);
  },

  headElements: (elements, { meta }) => [
    ...elements,
    meta.muiSheets.getStyleElement(),
  ],
});
