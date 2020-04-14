const path = require('path');

function webpackBase(config) {
  const baseConfig = {
    'devtool': config.devtool,
    'entry': {
      'weather': './src/index.js'
    },
    'mode': config.mode,
    'module': {
      'rules': [
        {
          'test': /\.js$/,
          'exclude': [
            path.resolve(__dirname, 'node_modules')
          ],
          'loader': 'babel-loader'
        },
        {
          'test': /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
          'loader': 'url-loader?limit=100000'
        }
      ]
    },
    'output': {
      'chunkFilename': '[name].bundle.js',
      'filename': '[name].bundle.js',
      'path': path.resolve(__dirname, '../../static/js')
    },
    'watch': config.watch
  };

  return baseConfig;
}

module.exports = webpackBase;

