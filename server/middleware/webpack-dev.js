
'use strict';

/**
 * Based on code from https://github.com/prashaantt/hapi-webpack-dev-middleware
 */

const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const winston = require('winston');
const log = new (winston.Logger)({
    'transports': [
        new (winston.transports.Console)(),
        new (winston.transports.File)({'filename': 'error.log'})
    ]
});

exports.register = (server, options, next) => {
    const config = options.config;
    const compiler = Webpack(config);
    const middleware = WebpackDevMiddleware(compiler, options.options);

    server.app.webpackCompiler = compiler;
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

    log.info('Webpack dev middleware loaded');
    next();
};

exports.register.attributes = {
    'name': 'webpack-dev',
    'version': '1.0.0'
};

