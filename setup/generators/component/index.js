/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
    'description': 'Add an unconnected component',
    'prompts': [{
        'type': 'input',
        'name': 'name',
        'message': 'What should it be called?',
        'default': 'Button',
        'validate': value => {
            if ((/.+/).test(value)) {
                return componentExists(value) ? 'A component or container with this name already exists' : true;
            }

            return 'The name is required';
        }
    }],
    'actions': [{
        'type': 'add',
        'path': '../../app/components/{{properCase name}}/index.js',
        'templateFile': './component/es6.js.hbs',
        'abortOnFail': true
    },
    {
        'type': 'add',
        'path': '../../app/components/{{properCase name}}/tests/index.js',
        'templateFile': './component/test.js.hbs',
        'abortOnFail': true
    }]
};

