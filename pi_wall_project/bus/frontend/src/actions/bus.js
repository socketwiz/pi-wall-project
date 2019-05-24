/*
 *
 * Bus actions
 *
 */

export const SET_SCHEDULE = 'SET_SCHEDULE';
export const SET_HOLIDAY = 'SET_HOLIDAY';

/**
 * Set the pickup data in the redux store
 *
 * @param {Object} data - data to store
 */
export function setSchedule(data) {
    return {
        'type': SET_SCHEDULE,
        'data': data
    };
}

/**
 * Set the holiday data in the redux store
 *
 * @param {Object} data - data to store
 */
export function setHoliday(data) {
    return {
        'type': SET_HOLIDAY,
        'data': data
    };
}
