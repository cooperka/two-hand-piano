// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

const path = require('path');

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));
    return `module.exports = ${assetFilename};`;
  },
};
