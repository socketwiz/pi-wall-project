/**
 * COMMON WEBPACK CONFIGURATION
 */

'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

module.exports = function webpackBase(options) {
    return {
        'entry': options.entry,

        'output': Object.assign({
            'path': path.resolve(process.cwd(), 'public/js')
        }, options.output),

        'module': {
            'loaders': [
                {'test': /\.json$/, 'loader': 'json-loader'},
                {'test': /\.scss$/, 'loader': 'style!css!postcss!sass'},
                {'test': /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
                {'test': /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
                {'test': /\.eot(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
                {'test': /\.svg(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
                {
                    'test': /\.js$/,
                    'exclude': /node_modules/,
                    'loader': 'babel',
                    'query': {'presets': ['react', 'es2015']}
                }
            ]
        },

        'postcss': [autoprefixer(
            {
                'browsers': ['Chrome >= 30', 'Firefox >= 20', 'ie >= 10']
            }
        )],

        'resolve': {
            'extensions': ['', '.js', '.jsx', '.scss'],
            'modules': ['frontend', 'node_modules']
        },

        'plugins': options.plugins.concat([
            new webpack.ProvidePlugin({
                '_': 'lodash',
                'React': 'react',
                'ReactDOM': 'react-dom'
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]),

        'devtool': options.devtool,
        'target': 'web'
    };
};

