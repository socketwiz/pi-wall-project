
const loopback = require('loopback');
const boot = require('loopback-boot');
const ngrok = (process.env.ENABLE_TUNNEL) && require('ngrok');

const app = module.exports = loopback();

app.start = function startServer() {
    // start the web server
    return app.listen(function listen() {
        app.emit('started');
        const baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl); // eslint-disable-line no-console
        if (app.get('loopback-component-explorer')) {
            const explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath); // eslint-disable-line no-console
        }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function boot(err) {
    if (err) {
        throw err;
    }

    // start the server if `$ node server.js`
    if (require.main === module) {
        app.start();
    }

    if (ngrok) {
        ngrok.connect(app.get('port'), (innerError, url) => {
            if (innerError) {
                return console.error(innerError);
            }

            console.log(`Proxy: ${url}`); // eslint-disable-line no-console
        });
    }
});
