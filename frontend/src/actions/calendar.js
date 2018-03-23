/*
 *
 * Calendar actions
 *
 */

export const SET_EVENTS = 'SET_EVENTS';

/**
 * Set the event data in the redux store
 *
 * @param {Object} event - data to store
 */
export function setEvents(events) {
    return {
        'type': SET_EVENTS,
        'events': events
    };
}
