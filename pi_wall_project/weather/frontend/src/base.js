import cloneDeep from 'lodash/cloneDeep';
import {COUNTDOWN} from './constants';
import {extendMoment} from 'moment-range';
import moment from 'moment';


/**
 * Navigate to the bus app
 */
export async function switchToBus() {
  const now = moment();

  if (await isHoliday() || isWeekend()) {
    return;
  }

  fetch('/bus/api/schedule')
    .then((response) => response.json())
    .then((data) => {
      let nextPickup = data.reduce((a, b) => {
        const momentA = moment(a.pickup, 'HH:mm:ss');
        const momentB = moment(b.pickup, 'HH:mm:ss');

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
    })
    .catch((error) => {
      console.error(error.message); // eslint-disable-line no-console
    });
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
  const holidayResponse = await fetch('/bus/api/holiday');
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
