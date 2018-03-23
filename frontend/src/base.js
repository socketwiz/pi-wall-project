
import client from 'socket.io-client';
import cloneDeep from 'lodash/cloneDeep';
import {COUNTDOWN} from './constants';
import moment from 'moment';
import Schedule from './schedule.json';

/**
 * Setup the socket.io listeners for navigation
 */
export function pushNavigation() {
    const socket = client(`http://${window.location.host}`);

    socket.on('redirect-bus', function redirectBus() {
        window.location.href = '/bus';
    });

    socket.on('redirect-calendar', function redirectCalendar() {
        window.location.href = '/calendar';
    });

    socket.on('redirect-weather', function redirectWeather() {
        window.location.href = '/';
    });
}


/**
 * Navigate to the bus app
 */
export function switchToBus() {
    const now = moment();

    let nextPickup = Schedule.pickups.reduce((a, b) => {
        const momentA = moment(a, 'HH:mm:ss');
        const momentB = moment(b, 'HH:mm:ss');

        return (momentA.isAfter(now) && momentA.isBefore(momentB)) ? momentA : momentB;
    });

    const beforeNextPickup = cloneDeep(nextPickup);

    beforeNextPickup.subtract(COUNTDOWN, 'minutes');

    if (beforeNextPickup.diff(now, 'minutes') <= 0 &&
        nextPickup.diff(now, 'minutes') >= 0) {
        window.location.href = '/bus';
    }
}
