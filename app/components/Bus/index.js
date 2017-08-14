/**
 * Bus
 */

import client from 'socket.io-client';
import {MINUTE, SECOND} from '../../constants';
import moment from 'moment';
import MomentRange from 'moment-range';
import React, {Component} from 'react';
import Schedule from '../../../schedule.json';

class Bus extends Component {
    constructor(props) {
        super(props);

        this.soundAlarm = false;

        let now = moment();
        let secondsLeft = 0;
        let nextPickup = Schedule.pickups.reduce((a, b) => {
            const momentA = moment(a, 'HH:mm:ss');
            const momentB = moment(b, 'HH:mm:ss');

            return (momentA.isAfter(now) && momentA.isBefore(momentB)) ? momentA : momentB;
        });

        // Bus pickup
        if (now.isSameOrBefore(nextPickup)) {
            secondsLeft = nextPickup.diff(now, 'seconds');
            this.soundAlarm = true;
        }

        this.runningTime = null;
        this.state = {
            'dayOff': false,
            'secondsLeft': secondsLeft,
            'minutes': 0,
            'running': true,
            'seconds': 0
        };
    }

    switchToWeather() {
        let nextPickup = Schedule.pickups.reduce((a, b) => {
            const momentA = moment(a, 'HH:mm:ss');
            const momentB = moment(b, 'HH:mm:ss');

            return (momentA.isAfter(now) && momentA.isBefore(momentB)) ? momentA : momentB;
        });
        let now = moment();

        nextPickup.add(1, 'minutes');

        if (nextPickup.diff(now, 'minutes') === 0) {
            location.href = '/';
        }
    }

    countdown() {
        let minutes = 0;
        let running = true;
        let seconds = 0;
        let timer = this.state.secondsLeft;

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (--timer < 0) {
            running = false;
            clearInterval(this.runningTime);

            if (this.soundAlarm) {
                console.log('Sounding alarm!!!');
                this.audio.play();
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

    componentDidMount() {
        const socket = client(`http://${location.host}`);

        socket.on('redirect-weather', function redirectWeather() {
            location.href = '/';
        });
    }

    componentWillMount() {
        const DAY = moment().day();
        const IS_WEEKEND = (DAY === 6) || (DAY === 0);
        const HOLIDAYS = Schedule.holidays;
        const HOLIDAY_BEGIN = new Date(HOLIDAYS[0].begin[0], HOLIDAYS[0].begin[1], HOLIDAYS[0].begin[2]);
        const HOLIDAY_END = new Date(HOLIDAYS[0].end[0], HOLIDAYS[0].end[1], HOLIDAYS[0].end[2]);
        const TODAY = new Date();
        const RANGE = moment().range(HOLIDAY_BEGIN, HOLIDAY_END);

        this.weatherTimer = setInterval(this.switchToWeather.bind(this), 1 * MINUTE);

        if (IS_WEEKEND || RANGE.contains(TODAY)) {
            this.setState({'dayOff': true});
        } else {
            this.setState({'dayOff': false});
            this.runningTime = setInterval(this.countdown.bind(this), 1 * SECOND);
        }
    }

    componentWillUnmount() {
        clearInterval(this.weatherTimer);
        clearInterval(this.runningTime);
    }

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
        let time = timeLeft < 10 ? '0' + timeLeft + ':00' : timeLeft + ':00';
        
        if (running) {
            time = `${minutes}:${seconds}`;
        }

        if (running === false) {
            runningClass.push('stopped');
        }

        document.querySelector('body').className = 'bus';

        if (dayOff) {
            dayPartial = <div>
                <div className="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h2 className="time-label">DAY OFF, NO SCHOOL!!!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        } else {
            dayPartial = <div>
                <div className="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h2 className="time-label">TIME UNTIL BUS</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clear"></div>

                <div className="timer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 text-center">
                                <span className={runningClass.join(' ')}>{time}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>;
        }

        return (
            <div className="wrapper">
                {dayPartial}

                <div className="clear"></div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 text-center">
                            <img src="/images/bus.png" />
                        </div>
                    </div>
                </div>

                <div className="clear"></div>
                <audio ref={ref => this.audio = ref} src="sounds/school-bell.wav"></audio>
            </div>
        );
    }
}

export default Bus;

