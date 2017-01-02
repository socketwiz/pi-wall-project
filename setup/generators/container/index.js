/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
    'description': 'Add a container component',
    'prompts': [{
        'type': 'input',
        'name': 'container',
        'message': 'What should it be called?',
        'default': 'Form',
        'validate': value => {
            if ((/.+/).test(value)) {
                return componentExists(value) ? 'A component or container with this name already exists' : true;
            }

            return 'The name is required';
        }
    }, {
        'type': 'confirm',
        'name': 'wantActionsAndReducer',
        'default': true,
        'message': 'Do you want actions/constants/reducer for this container?'
    }],
    'actions': data => {
        let actions = [{
            'type': 'add',
            'path': '../../app/containers/{{properCase container}}/index.js',
            'templateFile': './container/index.js.hbs',
            'abortOnFail': true
        }, {
            'type': 'add',
            'path': '../../app/containers/{{properCase container}}/tests/index.test.js',
            'templateFile': './container/test.js.hbs',
            'abortOnFail': true
        }];

        // If they want actions and a reducer, generate actions.js, constants.js,
        // reducer.js and the corresponding tests for actions and the reducer
        if (data.wantActionsAndReducer) {
            // Constants
            actions.push({
                'type': 'add',
                'path': '../../app/containers/{{properCase container}}/constants.js',
                'templateFile': './container/constants.js.hbs',
                'abortOnFail': true
            });

            // Actions
            actions.push({
                'type': 'add',
                'path': '../../app/actions/{{dashCase container}}.js',
                'templateFile': './container/actions.js.hbs',
                'abortOnFail': true
            });
            actions.push({
                'type': 'add',
                'path': '../../app/actions/tests/{{dashCase container}}.test.js',
                'templateFile': './container/actions.test.js.hbs',
                'abortOnFail': true
            });

            // Reducer
            actions.push({
                'type': 'add',
                'path': '../../app/reducers/{{dashCase container}}.js',
                'templateFile': './container/reducer.js.hbs',
                'abortOnFail': true
            });
            actions.push({
                'type': 'modify',
                'path': '../../app/reducers/index.js',
                'pattern': /(import {combineReducers} from 'redux';\s*)/g,
                'templateFile': './container/reducer-import.js.hbs'
            });
            actions.push({
                'type': 'modify',
                'path': '../../app/reducers/index.js',
                'pattern': /(homeContainerReducer,\s*)/g,
                'templateFile': './container/reducer-combine.js.hbs'
            });
            actions.push({
                'type': 'add',
                'path': '../../app/reducers/tests/{{dashCase container}}.test.js',
                'templateFile': './container/reducer.test.js.hbs',
                'abortOnFail': true
            });
        }

        return actions;
    }
};

