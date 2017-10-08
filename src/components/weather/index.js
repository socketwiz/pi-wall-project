
/**
 * Weather application
 */

import classNames from '../class-names';
import client from 'socket.io-client';
import {MINUTE, SECOND} from '../../constants';
import moment from 'moment';
import PropTypes from 'prop-types';
import {pushNavigation, switchToBus} from '../../base';
import React, {Component} from 'react';
import './weather.css';

class Weather extends Component {
    /**
     * Class constructor
     *
     * @param {Object} props - React element properties
     */
    constructor(props) {
        super(props);

        this.state = {
            'now': ''
        };
    }

    /**
     * Get the current time and date and set the "now" state variable
     */
    getCurrentTime() {
        let now = moment().format('dddd, MMMM Do, h:mm:ss A');

        this.setState({'now': now});
    }

    /**
     * React lifecycle method, invoked immediately after a component is mounted
     */
    componentDidMount() {
        pushNavigation();
    }

    /**
     * React lifecycle method, invoked immediatley before a component is mounted
     */
    componentWillMount() {
        const {getCurrentWeather} = this.props;

        getCurrentWeather();

        this.busTimer = setInterval(switchToBus, 1 * MINUTE);
        this.nowTimer = setInterval(this.getCurrentTime.bind(this), 1 * SECOND);
        this.weatherTimer = setInterval(getCurrentWeather, 5 * MINUTE);
    }

    /**
     * React component lifecycle method, invoked immediately before a component is unmounted
     */
    componentWillUnmount() {
        const socket = client(`http://${window.location.host}`);

        clearTimeout(this.busTimer);
        clearTimeout(this.nowTimer);
        clearTimeout(this.weatherTimer);

        socket.emit('end');
    }

    /**
     * When called, it should examine this.props and this.state and return a single React element.
     *
     * @returns {Object} - Single React element
     */
    render() {
        const {
            city,
            error,
            humidity,
            forecast,
            temp,
            weather,
            wind
        } = this.props;
        const {now} = this.state;

        let id = weather.length ? weather[0].id : '';
        let bgColorClass = classNames('weather-widget');
        let bgBodyBackground = 'normal'; // very-warm, warm, normal, cold, very-cold
        let weatherClass = 'wi wi-owm-' + id;
        let errorPartial;

        // Set the background colour based on the temperature
        if (temp >= 86) {
            bgBodyBackground = 'very-warm';
            bgColorClass.add('very-warm');
        } else if (temp > 68 && temp < 86) {
            bgBodyBackground = 'warm';
            bgColorClass.add('warm');
        } else if (temp > 50 && temp < 68) {
            bgBodyBackground = 'normal';
            bgColorClass.add('normal');
        } else if (temp > 32 && temp < 50) {
            bgBodyBackground = 'cold';
            bgColorClass.add('cold');
        } else if (temp <= 32) {
            bgBodyBackground = 'very-cold';
            bgColorClass.add('very-cold');
        }

        document.querySelector('body').className = bgBodyBackground;

        let hourlyRows = forecast.map((item, index) => {
            let temp = item.main.temp;
            let date = moment(item.dt_txt);
            let formattedDate = date.format('ddd hh:mm A');

            if (index >= 16) {
                return []; // only want 2 days worth of data at max
            }

            return <div className="row forecast-rows" key={index}>
                <div className="col-xs-4">{formattedDate}</div>
                <div className="col-xs-2">
                    <span className="temp-number">{temp}</span>
                    <span className="wi wi-degrees"></span>
                </div>
                <div className="col-xs-3">
                    <i className="wi wi-raindrop"></i> {item.main.humidity} %
                </div>
                <div className="col-xs-3">
                    <i className="wi wi-small-craft-advisory"></i> {item.wind.speed} <span className="vel">Mi/h</span>
                </div>
            </div>;
        });

        if (error) {
            errorPartial = <div className="error">
                <h1>{error}</h1>
            </div>;
        }

        let weatherPartial = <div className="container-fluid weather-container">
            {errorPartial}
            <div className="row text-center">
                <div className="col-xs-12 time">{now}</div>
            </div>
            <div className="row">
                <div className="col-xs-6">
                    <div className={bgColorClass.get()}>
                        <h1 className="city">{city}</h1>
                        <div className="weather">
                            <i className={weatherClass}></i>
                        </div>
                        <section className="weather-details">
                            <div className="temp">
                                <span className="temp-number">{temp}</span>
                                <span className="wi wi-degrees"></span>
                            </div>
                            <div className="humidity">
                                <i className="wi wi-raindrop"></i>{humidity} %
                            </div>
                            <div className="wind">
                                <i className="wi wi-small-craft-advisory"></i>
                                {wind} <span className="vel">Mi/h</span>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="col-xs-6">
                    {hourlyRows}
                </div>
            </div>
        </div>;

        return (
            <div>{weatherPartial}</div>
        );
    }
}

Weather.propTypes = {
    'getCurrentWeather': PropTypes.func.isRequired,
    'city': PropTypes.string,
    'error': PropTypes.string,
    'humidity': PropTypes.number,
    'forecast': PropTypes.array,
    'temp': PropTypes.number,
    'weather': PropTypes.array,
    'wind': PropTypes.number
};

export default Weather;

