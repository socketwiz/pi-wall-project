'use strict';

const base = require('./base');
const Hapi = require('hapi');
const Inert = require('inert');
const IS_DEV = process.env.NODE_ENV !== 'production';
const NGROK = (IS_DEV && process.env.ENABLE_TUNNEL) && require('ngrok');
const path = require('path');
const server = new Hapi.Server();
const port = process.env.PORT || 8080;
const routes = require('./api-v1');

server.connection({'port': port});

const io = require('socket.io')(server.listener);

let middleware = [Inert];

server.register(middleware, error => {
    if (error) {
        base.log.error(error);
        throw error;
    }
});

function catchAll(request, reply) {
    if (request.path.indexOf('/api') > -1) {
        return; // api call
    }

    if (request.path === '/' || request.path.split('.').length === 1) {
        reply.file(path.join(__dirname, '../build/index.html'));
    } else {
        reply.file(path.join(__dirname, `../build/${request.path}`));
    }
}

routes.push({
    'method': 'GET',
    'path': '/{param*}',
    'handler': catchAll
});

server.route(routes);

server.on('response', function response(request) {
    const remoteAddress = request.info.remoteAddress;
    const method = request.method.toUpperCase();
    const path = request.url.path;
    const statusCode = request.response.statusCode;

    base.log.info(`${remoteAddress}: ${method} ${path} --> ${statusCode}`);
});

io.on('connection', function onConnection(socket) {
    socket.on('bus', function onBus() {
        socket.broadcast.emit('redirect-bus');
    });
    socket.on('end', function onEnd() {
        socket.disconnect();
    });
    socket.on('weather', function onWeather() {
        socket.broadcast.emit('redirect-weather');
    });
});

server.start((error) => {
    if (error) {
        base.log.error(error);
        throw error;
    }

    base.log.info(`LAN: http://localhost:${port}`);

    // Connect to ngrok in dev mode
    if (NGROK) {
        NGROK.connect(port, (innerErr, url) => {
            if (innerErr) {
                return base.log.error(innerErr);
            }

            base.log.info(`Proxy: ${url}`);
        });
    }
});

