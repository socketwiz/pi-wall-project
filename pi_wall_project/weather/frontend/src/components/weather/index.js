
/**
 * Weather application
 */

import classNames from '../class-names';
import {MINUTE, SECOND} from '../../constants';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

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
    let now = moment().format('dddd, MMMM Do, HH:mm:ss');

    this.setState({'now': now});
  }

  /**
   * Convert fahrenheit to celsius
   *
   * @param {Number} fahrenheit - temp to convert
   * @returns {Number} - temp converted to celsius
   */
  toCelsius(fahrenheit) {
    return parseInt(((fahrenheit - 32) * (5 / 9)).toFixed(2), 10);
  }

  /**
   * React lifecycle method, invoked immediately after a component is mounted
   */
  componentDidMount() {
    const {getCurrentWeather} = this.props;

    if (typeof getCurrentWeather === 'function') {
      getCurrentWeather();
    }

    this.nowTimer = setInterval(this.getCurrentTime.bind(this), 1 * SECOND);
    this.weatherTimer = setInterval(getCurrentWeather, 5 * MINUTE);
  }

  /**
   * React component lifecycle method, invoked immediately before a component is unmounted
   */
  componentWillUnmount() {
    clearTimeout(this.busTimer);
    clearTimeout(this.nowTimer);
    clearTimeout(this.weatherTimer);
  }

  /**
   * When called, it should examine this.props and this.state and return a single React element.
   *
   * @returns {Object} - Single React element
   */
  render() {
    const {
      error,
      chanceOfPrecipitation,
      forecast,
      temp,
      tempMin,
      tempMax,
      weather,
      wind
    } = this.props;
    const {now} = this.state;

    let bgColorClass = classNames('weather-widget text-center');
    let bgBodyBackground = 'normal'; // very-warm, warm, normal, cold, very-cold
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

    const dailyRows = forecast.map((description, index) => {
      const title = description.name;
      const text = description.detailedForecast;
      const icon = description.icon;

      return <div className="row forecast-rows" key={index}>
          <div className="col-1"><img alt="forecast icon" src={icon} /></div>
          <div className="col-2">{title}</div>
          <div className="col-9">{text}</div>
        </div>;
    });

    if (error) {
      errorPartial = <div className="error">
        <h1>{error}</h1>
        </div>;
    }

    const weatherPartial = <div>
      {errorPartial}
      <div className="row text-center time">
        <div className="col-12 time">{now}</div>
      </div>
      <div className="row details">
        <div className="col-5">
          <div className={bgColorClass.get()}>
            <div id="weather">
              <img alt="weather" className="weather-icon" src={weather} />
            </div>
            <section className="weather-details">
              <div className="temp">
                <span className="temp-number">{temp}</span>
                <span className="tempType typeF">F</span>
                <span className="wi wi-degrees"></span>
              </div>
              <div className="variants">
                <span>Low</span> {tempMin} <span className="wi wi-degrees"></span>
              </div>
              <div className="variants">
                <span>High</span> {tempMax} <span className="wi wi-degrees"></span>
              </div>
            </section>
            <section className="weather-details">
              <div className="temp">
                <span className="temp-number">{this.toCelsius(temp)}</span>
                <span className="tempType typeC">C</span>
                <span className="wi wi-degrees"></span>
              </div>
              <div className="humidity">
                {chanceOfPrecipitation}% <span className="sub-text">chance precipitation</span>
              </div>
              <div className="wind">
                {wind} <span className="sub-text">Mi/h</span>
              </div>
            </section>
          </div>
        </div>
        <div className="col-7">
          {dailyRows}
        </div>
      </div>
    </div>;

    return (
        <div id="weather">{weatherPartial}</div>
    );
  }
}

Weather.propTypes = {
  'getCurrentWeather': PropTypes.func.isRequired,
  'chanceOfPrecipitation': PropTypes.number,
  'error': PropTypes.string,
  'forecast': PropTypes.array,
  'temp': PropTypes.number,
  'tempMin': PropTypes.number,
  'tempMax': PropTypes.number,
  'weather': PropTypes.string,
  'wind': PropTypes.number
};

export default Weather;
