// Important modules this config uses
'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base')({
    'entry': {
        'main': path.join(process.cwd(), 'app/app')
    },

    'output': {
        'filename': '[name].bundle.js',
        'chunkFilename': '[name].chunk.js'
    },

    // Load the CSS in a style tag
    'cssLoaders': 'style!css!sass',

    'plugins': [
        // Merge all duplicate modules
        new webpack.optimize.DedupePlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});

