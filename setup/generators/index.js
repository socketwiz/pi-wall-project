
const fs = require('fs');
const COMPONENT_GENERATOR = require('./component/index.js');
const CONTAINER_GENERATOR = require('./container/index.js');
const ROUTE_GENERATOR = require('./route/index.js');

module.exports = function plopfile(plop) {
    plop.setGenerator('component', COMPONENT_GENERATOR);
    plop.setGenerator('container', CONTAINER_GENERATOR);
    plop.setGenerator('route', ROUTE_GENERATOR);

    plop.addHelper('directory', comp => {
        try {
            fs.accessSync(`app/containers/${comp}`, fs.F_OK);
            return `containers/${comp}`;
        } catch (e) {
            return `components/${comp}`;
        }
    });
    plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};

