/**
 * Component Generator
 */

const fs = require('fs');
const componentExists = require('../utils/componentExists');

function trimTemplateFile(template) {
    // Loads the template file and trims the whitespace and then returns the content as a string.
    return fs.readFileSync(`setup/generators/route/${template}`, 'utf8').replace(/\s*$/, '');
}

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
        'pattern': /(import {Route} from 'react-router';\s*)/g,
        'template': trimTemplateFile('route-import.hbs')
    }, {
        'type': 'modify',
        'path': '../../app/routes.js',
        'pattern': /({App}>\s*)/g,
        'template': trimTemplateFile('route.hbs')
    }]
};

