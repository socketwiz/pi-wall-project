/**
 * Bus application
 */

import {COUNTDOWN, SECOND} from '../../constants';
import moment from 'moment';
import {isHoliday, isWeekend, pushNavigation} from '../../base';
import React, {Component} from 'react';

class Bus extends Component {
  /**
   * Class constructor
   *
   * @param {Object} props - React element properties
   */
  constructor(props) {
    super(props);

    let secondsLeft = 0;

    this.soundAlarm = false;
    this.runningTime = null;
    this.state = {
      'dayOff': false,
      'secondsLeft': secondsLeft,
      'minutes': 0,
      'running': true,
      'seconds': 0,
      'totalTime': (secondsLeft / 60)
    };
  }

  /**
   * Navigate to the weather app
   */
  switchToWeather() {
    // there may or may not be another pickup,
    // switch back to weather for now, weather
    // can switch back if it needs to
    window.location.href = '/';
  }

  /**
   * Update the countdown timer, and sound an alarm when the timer hits 0:00
   */
  async countdown() {
    let minutes = 0;
    let running = true;
    let seconds = 0;
    let timer = this.state.secondsLeft;

    minutes = Math.floor(timer / 60);
    seconds = Math.floor(timer % 60);

    if (--timer < 0) {
      running = false;
      clearInterval(this.runningTime);

      if (this.soundAlarm) {
        const alarmResponse = await fetch('/bus/api/alarm/');
        const alarm = await alarmResponse.json();

        console.log(alarm.msg); // eslint-disable-line no-console

        // give the sound some time to play out then switch back to weather
        this.weatherTimer = setTimeout(this.switchToWeather, 30 * SECOND);
      }
      timer = 0;
    }

    this.setState({
      'secondsLeft': timer,
      'minutes': minutes,
      'running': running,
      'seconds': ('0' + seconds).slice(-2)
    });
  }

  /**
   * React lifecycle method, invoked immediately after a component is mounted
   */
  async componentDidMount() {
    let now = moment();

    fetch('/bus/api/schedule')
      .then((response) => response.json())
      .then((data) => {
        let nextPickup = data.reduce((a, b) => {
          const momentA = moment(a.pickup, 'HH:mm:ss');
          const momentB = moment(b.pickup, 'HH:mm:ss');

          return (momentA.isAfter(now) && momentA.isBefore(momentB)) ? momentA : momentB;
        });

        // Bus pickup
        if (now.isSameOrBefore(nextPickup)) {
          this.setState({'secondsLeft': nextPickup.diff(now, 'seconds')});
          this.soundAlarm = true;
        }
      })
      .catch((error) => {
        console.error(error.message); // eslint-disable-line no-console
      });

    if (await isHoliday() || isWeekend()) {
      this.setState({'dayOff': true});
    } else {
      this.setState({'dayOff': false});
      this.runningTime = setInterval(this.countdown.bind(this), 1 * SECOND);
    }

    pushNavigation();
  }

  /**
   * React component lifecycle method, invoked immediately before a component is unmounted
   */
  componentWillUnmount() {
    clearInterval(this.weatherTimer);
    clearInterval(this.runningTime);
  }

  /**
   * When called, it should examine this.props and this.state and return a single React element.
   *
   * @returns {Object} - Single React element
   */
  render() {
    const {
      dayOff,
      secondsLeft,
      running,
      minutes,
      seconds
    } = this.state;

    let dayPartial = {};
    let runningClass = ['bus-timer'];
    let timeLeft = secondsLeft / 60;
    let time = timeLeft < COUNTDOWN ? '0' + timeLeft + ':00' : timeLeft + ':00';
    
    if (running) {
      time = `${minutes}:${seconds}`;
    }

    if (running === false) {
      runningClass.push('stopped');
    }

    document.querySelector('body').className = 'bus';

    if (dayOff) {
      dayPartial = (
        <div>
          <div className="top">
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <h2 className="time-label">DAY OFF, NO SCHOOL!!!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      dayPartial = (
        <div>
          <div className="top">
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <h2 className="time-label">TIME UNTIL BUS</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="clear"></div>

          <div className="timer">
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <span className={runningClass.join(' ')}>{time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="wrapper">
        {dayPartial}

        <div className="clear"></div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <img src="/static/images/bus.png" alt="Bus" />
            </div>
          </div>
        </div>

        <div className="clear"></div>
      </div>
    );
  }
}

export default Bus;

