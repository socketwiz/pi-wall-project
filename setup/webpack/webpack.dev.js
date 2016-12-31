// Important modules this config uses
'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = require('./webpack.base')({
    'entry': {
        'main': path.join(process.cwd(), 'app/index.js')
    },

    'output': {
        'filename': '[name].bundle.js',
        'chunkFilename': '[name].chunk.js'
    },

    // Load the CSS in a style tag
    'cssLoaders': 'style!css!sass',

    'plugins': [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    'devtool': 'inline-source-map'
});

