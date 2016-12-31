
/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 *
 * Based on code from:
 * https://github.com/mxstbr/react-boilerplate/blob/master/internals/generators/utils/componentExists.js
 */

const fs = require('fs');
const pageComponents = fs.readdirSync('app/components');
const pageContainers = fs.readdirSync('app/containers');
const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
    return components.indexOf(comp) >= 0;
}

module.exports = componentExists;

