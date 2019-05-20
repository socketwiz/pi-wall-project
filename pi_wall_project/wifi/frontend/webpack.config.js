const path = require('path');

function webpackBase(config) {
  const baseConfig = {
    'devtool': config.devtool,
    'entry': {
      'wifi': './src/index.js'
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
    'optimization': {
      'splitChunks': {
        'cacheGroups': {
          'commons': {
            'chunks': 'initial',
            'maxInitialRequests': 5,
            'minChunks': 2,
            'minSize': 0
          },
          'vendor': {
            'chunks': 'initial',
            'enforce': true,
            'name': 'vendor-wifi',
            'priority': 10,
            'test': /[\\/]node_modules[\\/]/
          }
        }
      }
    },
    'watch': config.watch
  };

  return baseConfig;
}

module.exports = webpackBase;

