/*
 *
 * Calendar actions
 *
 */

export const SET_CALENDAR = 'SET_CALENDAR';

/**
 * Set the calendar data in the redux store
 *
 * @param {Object} data - data to store
 */
export function setCalendar(data) {
    return {
        'type': SET_CALENDAR,
        'data': data
    };
}
