
/**
 * Check fetch status
 *
 * @param {Object} response - fetch response
 * @returns {Object} - fetch response
 */
export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    if (response.status === 404) {
        return Promise.reject(new Error('404 error, api not found'));
    }
    if (response.status === 500) {
        return Promise.reject(new Error('500 error, something went wrong'));
    }
}

/**
 * Convert fetch response to JSON object
 *
 * @param {Object} response - fetch response
 * @returns {Object} - JSON object
 */
export function fetchJSON(response) {
    return response.json();
}
