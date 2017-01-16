'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const IS_DEV = process.env.NODE_ENV !== 'production';
const NGROK = (IS_DEV && process.env.ENABLE_TUNNEL) && require('ngrok');
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

server.connection({'port': port});

const io = require('socket.io')(server.listener);

const dev = {
    'register': WebpackDevMiddleware,
    'options': {
        'config': require('../setup/webpack/webpack.dev.js'),
        'options': {
            'noInfo': true,
            'publicPath': '/js'
        }
    }
};
const hot = {
    'register': WebpackHotMiddleware
};

let middleware = [Inert];

if (IS_DEV) {
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
    const remoteAddress = request.info.remoteAddress;
    const method = request.method.toUpperCase();
    const path = request.url.path;
    const statusCode = request.response.statusCode;

    log.info(`${remoteAddress}: ${method} ${path} --> ${statusCode}`);
});

io.on('connection', function onConnection(socket) {
    socket.on('bus', function onBus() {
        socket.broadcast.emit('redirect-bus');
    });
    socket.on('weather', function onWeather() {
        socket.broadcast.emit('redirect-weather');
    });
});

server.start((error) => {
    if (error) {
        log.error(error);
        throw error;
    }

    log.info(`LAN: http://localhost:${port}`);

    // Connect to ngrok in dev mode
    if (NGROK) {
        NGROK.connect(port, (innerErr, url) => {
            if (innerErr) {
                return log.error(innerErr);
            }

            log.info(`Proxy: ${url}`);
        });
    }
});

