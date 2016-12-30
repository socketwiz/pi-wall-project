/* global __dirname, require */

'use strict';

const bunyan = require('bunyan');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');

const log = bunyan.createLogger(
    {
        'level': 'info',
        'streams': [
            {
                'level': 'info',
                'stream': process.stdout
            },
            {
                'level': 'warn',
                'path': __dirname + '/error.log'
            }
        ]
    }
);
const server = new Hapi.Server();
const engine = require('hapi-react')({
    'beautify': true
});

server.connection({ 'port': 3000 });

server.register([Inert, Vision], (error) => {
    if (error) {
        log.error(error);
        throw error;
    }

    server.views({
        'defaultExtension': 'jsx',
        'engines': {
            'jsx': engine,
            'js': engine
        },
        'relativeTo': __dirname,
        'path': 'templates'
    });

    server.route({
        'method': 'GET',
        'path': '/',
        'handler': function getIndex(request, reply) {
            reply.view('index', {
                'hostname': request.info.hostname
            });
        }
    });

    server.route({
        'method': 'GET',
        'path': '/{param*}',
        'handler': {
            'directory': {
                'path': 'public',
                'index': 'index.html',
                'listing': false,
                'redirectToSlash': true
            }
        }
    });

    server.route({
        'method': 'GET',
        'path': '/lib/{param*}',
        'handler': {
            'directory': {
                'path': 'node_modules'
            }
        }
    });

    server.start((error) => {
        if (error) {
            log.error(error);
            throw error;
        }

        var banner = 'Server running at: ' + server.info.uri;

        log.info(banner);
    });
});

