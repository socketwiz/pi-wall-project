/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
    'description': 'Add a route',
    'prompts': [{
        'type': 'confirm',
        'name': 'isContainer',
        'default': true,
        'message': 'Is this a container?'
    }, {
        'type': 'input',
        'name': 'component',
        'message': 'Which component should the route show?',
        'validate': (value) => {
            if ((/.+/).test(value)) {
                return componentExists(value) ? true : `"${value}" doesn't exist.`;
            }

            return 'The path is required';
        }
    }, {
        'type': 'input',
        'name': 'path',
        'message': 'Enter the path of the route.',
        'default': '/about',
        'validate': (value) => {
            if ((/.+/).test(value)) {
                return true;
            }

            return 'path is required';
        }
    }],
    'actions': [{
        'type': 'modify',
        'path': '../../app/routes.js',
        'pattern': /('react-router';\s*)/g,
        'templateFile': './route/route-import.hbs'
    }, {
        'type': 'modify',
        'path': '../../app/routes.js',
        'pattern': /({HomeContainer}>\s*)/g,
        'templateFile': './route/route.hbs'
    }]
};

