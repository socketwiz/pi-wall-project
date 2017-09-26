/**
 * Weather application
 */

import 'whatwg-fetch';
import {MINUTE, SECOND} from '../../constants';
import moment from 'moment';
import React, {Component} from 'react';
import client from 'socket.io-client';
import Schedule from '../../schedule.json';

class Weather extends Component {
    /**
     * Class constructor
     *
     * @param {Object} props - React element properties
     */
    constructor(props) {
        super(props);

        this.state = {
            'city': '',
            'error': '',
            'forecast': [],
            'now': '',
            'temp': 0,
            'humidity': 0,
            'weather': [],
            'wind': 0
        };
    }

    /**
     * Navigate to the bus app
     */
    switchToBus() {
        let nextPickup = Schedule.pickups.reduce((a, b) => {
            const momentA = moment(a, 'HH:mm:ss');
            const momentB = moment(b, 'HH:mm:ss');

            return (momentA.isAfter(now) && momentA.isBefore(momentB)) ? momentA : momentB;
        });
        let now = moment();

        nextPickup.subtract(10, 'minutes');

        if (nextPickup.diff(now, 'minutes') === 0) {
            window.location.href = '/bus';
        }
    }

    /**
     * Get the current time and date and set the "now" state variable
     */
    getCurrentTime() {
        let now = moment().format('dddd, MMMM Do, h:mm:ss A');

        this.setState({'now': now});
    }

    /**
     * Get the weather from an API and update the state variables
     */
    getCurrentWeather(endpoint) {
        fetch(endpoint)
            .then(response => response.json().then(data => {
                let status = parseInt(data.cod, 10);

                if (status !== 200 && status !== 0) {
                    return this.setState({
                        'error': `STATUS: ${data.cod} MESSAGE: ${data.message}`
                    });
                } else {
                    return this.setState({
                        'error': '',
                        'temp': data.main.temp,
                        'humidity': data.main.humidity,
                        'weather': data.weather,
                        'wind': data.wind.speed
                    });
                }
            }));
    }

    /**
     * React lifecycle method, invoked immediately after a component is mounted
     */
    componentDidMount() {
        const socket = client(`http://${window.location.host}`);

        socket.on('redirect-bus', function redirectBus() {
            window.location.href = '/bus';
        });
    }

    /**
     * React lifecycle method, invoked immediatley before a component is mounted
     */
    componentWillMount() {
        const API_SERVER = 'http://api.openweathermap.org';
        const API_WEATHER = '/data/2.5/weather';
        const API_FORECAST = '/data/2.5/forecast';
        const PARAMS = `?units=imperial&zip=22603&appid=${process.env.REACT_APP_OPEN_WEATHER_API}`;

        let weatherEndpoint = `${API_SERVER}${API_WEATHER}${PARAMS}`;
        let forecastEndpoint = `${API_SERVER}${API_FORECAST}${PARAMS}`;

        this.busTimer = setInterval(this.switchToBus.bind(this), 1 * MINUTE);
        this.nowTimer = setInterval(this.getCurrentTime.bind(this), 1 * SECOND);
        this.weatherTimer = setInterval(
            this.getCurrentWeather.bind(this),
            5 * MINUTE,
            weatherEndpoint
        );

        // Call it once now, don't wait the 5 minutes
        let getWeather = this.getCurrentWeather.bind(this);

        getWeather(weatherEndpoint);

        fetch(forecastEndpoint)
            .then(response => response.json().then(data => {
                if (data.cod === 401) {
                    return;
                }

                return this.setState({
                    'city': data.city.name,
                    'forecast': data.list
                });
            }));

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
            now,
            temp,
            weather,
            wind
        } = this.state;

        let id = weather.length ? weather[0].id : '';
        let bgColorClass = 'weather-widget '; // very-warm, warm, normal, cold, very-cold
        let bgBodyBackground = 'normal';
        let weatherClass = 'wi wi-owm-' + id;
        let errorPartial;

        // Set the background colour based on the temperature
        if (temp >= 86) {
            bgBodyBackground = 'very-warm';
            bgColorClass += 'very-warm';
        } else if (temp > 68 && temp < 86) {
            bgBodyBackground = 'warm';
            bgColorClass += 'warm';
        } else if (temp > 50 && temp < 68) {
            bgBodyBackground = 'normal';
            bgColorClass += 'normal';
        } else if (temp > 32 && temp < 50) {
            bgBodyBackground = 'cold';
            bgColorClass += 'cold';
        } else if (temp <= 32) {
            bgBodyBackground = 'very-cold';
            bgColorClass += 'very-cold';
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
                    <div className={bgColorClass}>
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

export default Weather;

