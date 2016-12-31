
'use strict';

/**
 * Based on code from https://github.com/prashaantt/hapi-webpack-hot-middleware
 */

const WebpackHotMiddleware = require('webpack-hot-middleware');
const winston = require('winston');
const log = new (winston.Logger)({
    'transports': [
        new (winston.transports.Console)(),
        new (winston.transports.File)({'filename': 'error.log'})
    ]
});

exports.register = (server, options, next) => {
    const hotMiddlewareOptions = options.options;
    const compiler = server.app.webpackCompiler;
    const middleware = WebpackHotMiddleware(compiler, hotMiddlewareOptions);

    server.ext('onRequest', (request, reply) => {

        const req = request.raw.req;
        const res = request.raw.res;

        middleware(req, res, (error) => {
            if (error) {
                log.error(error);
                return reply(error);
            }

            return reply.continue();
        });
    });

    log.info('Webpack hot middleware loaded');
    next();
};

exports.register.attributes = {
    'name': 'webpack-hot',
    'version': '1.0.0'
};

