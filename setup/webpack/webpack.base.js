/**
 * COMMON WEBPACK CONFIGURATION
 */

'use strict';

const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

module.exports = function webpackBase(options) {
    return {
        'entry': options.entry,

        'output': Object.assign({
            'path': path.resolve(process.cwd(), 'public/js'),
            'publicPath': 'js/'
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
                    'loader': 'babel-loader'
                }
            ]
        },

        'sassLoader': _.assign({
            'includePaths': [
                path.resolve(__dirname, '../../node_modules/bootstrap-sass/assets/stylesheets'),
                path.resolve(__dirname, '../../node_modules/weather-icons/sass')
            ],

            'precision': 8
        }),

        'postcss': [autoprefixer(
            {
                'browsers': ['Chrome >= 30', 'Firefox >= 20', 'ie >= 10']
            }
        )],

        'resolve': {
            'extensions': ['', '.js', '.jsx', '.scss'],
            'modules': ['app', 'node_modules']
        },

        'plugins': options.plugins.concat([
            new webpack.ProvidePlugin({
                '_': 'lodash',
                'React': 'react',
                'ReactDOM': 'react-dom'
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                'process.env.OPEN_WEATHER_API': JSON.stringify(process.env.OPEN_WEATHER_API)
            })
        ]),

        'devtool': options.devtool,
        'target': 'web'
    };
};

