/**
 * (The MIT License)
 *
 * Copyright (c) 2016 Prashant Tiwari <prashaantt@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
* CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
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

