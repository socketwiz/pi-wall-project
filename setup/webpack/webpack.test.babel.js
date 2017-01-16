
/**
 * TEST WEBPACK CONFIGURATION
 */

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const modules = [
    'app',
    'node_modules'
];

module.exports = {
    'devtool': 'inline-source-map',
    'module': {
        // Some libraries don't like being run through babel.
        // If they gripe, put them here.
        noParse: [
            /node_modules(\\|\/)sinon/
        ],
        loaders: [
            {'test': /\.json$/, 'loader': 'json-loader'},
            {'test': /\.scss$/, 'loader': 'style!css!postcss!sass'},
            {'test': /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
            {'test': /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
            {'test': /\.eot(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
            {'test': /\.svg(\?v=\d+\.\d+\.\d+)?$/, 'loader': 'file-loader'},
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                'loader': 'babel-loader',
                'query': {'presets': ['react', 'es2015']}
            }
        ]
    },

    'postcss': [autoprefixer(
        {
            'browsers': ['Chrome >= 30', 'Firefox >= 20', 'ie >= 10']
        }
    )],

    'plugins': [
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],

    // Some node_modules pull in Node-specific dependencies.
    // Since we're running in a browser we have to stub them out. See:
    // https://webpack.github.io/docs/configuration.html#node
    // https://github.com/webpack/node-libs-browser/tree/master/mock
    // https://github.com/webpack/jade-loader/issues/8#issuecomment-55568520
    'node': {
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    // required for enzyme to work properly
    'externals': {
        'jsdom': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
    },
    'resolve': {
        modules,
        alias: {
            // required for enzyme to work properly
            sinon: 'sinon/pkg/sinon'
        }
    }
};

