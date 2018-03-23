
function urlNotFound() {
    return function raiseUrlNotFoundError(req, res) {
        const options = {
            'root': __dirname + '../../../frontend/public'
        };

        res.status(404).sendFile('404.html', options, (error) => {
            if (error) {
                console.error(error); // eslint-disable-line no-console
                res.status(error.status).end();
            }
        });
    };
}

module.exports = urlNotFound;
