'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const WebpackDevMiddleware = require('./middleware/webpack-dev');
const WebpackHotMiddleware = require('./middleware/webpack-hot');
const winston = require('winston');
const log = new (winston.Logger)({
    'transports': [
        new (winston.transports.Console)(),
        new (winston.transports.File)({'filename': 'error.log'})
    ]
});
const server = new Hapi.Server();
const port = process.env.PORT || 3000;

server.connection({ 'port': port });

let webpackConfig = require('../setup/webpack/webpack.dev.js');

if (process.env.NODE_ENV === 'production') {
    webpackConfig = require('../setup/webpack/webpack.prod.js');
}

const dev = {
    'register': WebpackDevMiddleware,
    'options': {
        'config': webpackConfig
    }
};
const hot = {
    'register': WebpackHotMiddleware
};

let middleware = [Inert];

if (process.env.NODE_ENV === 'development') {
    middleware.push(dev);
    middleware.push(hot);
}

server.register(middleware, error => {
    if (error) {
        log.error(error);
        throw error;
    }
});

server.route({
    'method': 'GET',
    'path': '/{param*}',
    'handler': {
        'directory': {
            'index': true,
            'path': 'public',
            'redirectToSlash': true
        }
    }
});

server.on('response', function response(request) {
    log.info(
        request.info.remoteAddress +
            ': ' +
            request.method.toUpperCase() +
            ' ' +
            request.url.path +
            ' --> ' +
            request.response.statusCode
    );
});

server.start((error) => {
    if (error) {
        log.error(error);
        throw error;
    }

    log.info(`Server running at: ${server.info.uri}`);
});

