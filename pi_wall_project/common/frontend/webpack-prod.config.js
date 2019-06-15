
const webpackBase = require('./webpack.config.js');

const config = webpackBase({
  'devtool': '',
  'mode': 'production',
  'watch': false
});

module.exports = config;
