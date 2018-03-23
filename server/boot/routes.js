
const path = require('path');

module.exports = function routes(app) {
    // bootstrap.min.css
    app.get('/styles/bootstrap.min.css', function bootstrap(req, res) {
        res.sendFile(path.resolve(__dirname, '../..', 'frontend/node_modules/bootstrap/dist/css/bootstrap.min.css'));
    });

    // prism.css
    app.get('/styles/themes/prism.css', function prism(req, res) {
        res.sendFile(path.resolve(__dirname, '../..', 'node_modules/prismjs/themes/prism.css'));
    });

    // login
    app.post('/token', (req, res) => {
        const credentials = {
            'email': req.body.email,
            'password': req.body.password
        };

        app.models.User.login(credentials, 'user', (error, token) => {
            if (error) {
                res.send(error);
                return;
            }

            res.send({
                'accessToken': token.id
            });
        });
    });

    app.get('/destroy-token', (req, res, next) => {
        if (!req.accessToken) {
            // return 401:unauthorized if accessToken is not present
            return res.sendStatus(401);
        }

        app.models.User.logout(req.accessToken.id, (error) => {
            if (error) {
                return next(error);
            }

            res.send({
                'message': 'accessToken destroyed'
            });
        });
    });
};

