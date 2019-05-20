
import cloneDeep from 'lodash/cloneDeep';
import {COUNTDOWN} from './constants';
import {extendMoment} from 'moment-range';
import moment from 'moment';
import Schedule from './schedule.json';

/**
 * Setup the socket.io listeners for navigation
 */
export function pushNavigation() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  // Listen for messages
  socket.addEventListener('message', function eventListener(event) {
    const data = event.data;

    switch (data) {
      case 'redirect-weather':
        window.location = '/';
        break;
      case 'redirect-bus':
        window.location = '/bus';
        break;
      case 'redirect-wifi':
        window.location = '/wifi';
        break;
      default:
        console.error(`unknown-route: ${data}`);
        break;
    }
  });
}


/**
 * Navigate to the bus app
 */
export async function switchToBus() {
  const now = moment();

  if (await isHoliday() || isWeekend()) {
    return;
  }

  let nextPickup = Schedule.pickups.reduce((a, b) => {
    const momentA = moment(a, 'HH:mm:ss');
    const momentB = moment(b, 'HH:mm:ss');

    return (momentA.isAfter(now) && momentA.isBefore(momentB)) ? momentA : momentB;
  });

  if (typeof nextPickup === 'string') {
    nextPickup = moment(nextPickup, 'HH:mm:ss');
  }

  const beforeNextPickup = cloneDeep(nextPickup);

  beforeNextPickup.subtract(COUNTDOWN, 'minutes');

  if (beforeNextPickup.diff(now, 'minutes') <= 0 &&
      nextPickup.diff(now, 'minutes') >= 0) {
    window.location.href = '/bus';
  }
}

/**
 * Based on the day, determine whether or not this is a weekend
 */
export function isWeekend() {
  const day = moment().day();

  return (day === 6) || (day === 0);
}

/**
 * Look through the schedule and determine if today is a holiday or not
 *
 * @param {Array} holidays - array of year, month, day
 * @returns {Boolean} - true if holiday otherwise false
 */
export async function isHoliday() {
  const holidayResponse = await fetch('/api/holidays');
  const holidays = await holidayResponse.json();
  const now = new Date();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const formattedDate = `${now.getFullYear()}-${month}-${day}T12:00:00.000Z`;
  const today = new Date(formattedDate);

  for (let i = 0; i < holidays.length; i++) {
    const holidayBegin = new Date(`${holidays[i].begin}T12:00:00.000Z`);
    const holidayEnd = new Date(`${holidays[i].end}T12:00:00.000Z`);
    const range = extendMoment(moment).range(holidayBegin, holidayEnd);

    if (range.contains(today)) {
      return true;
    }
  }

  return false;
}
