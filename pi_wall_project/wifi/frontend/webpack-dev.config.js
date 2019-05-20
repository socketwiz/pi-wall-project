
const webpackBase = require('./webpack.config.js');

const config = webpackBase({
  'devtool': 'cheap-module-source-map',
  'mode': 'development',
  'watch': true
});

module.exports = config;
