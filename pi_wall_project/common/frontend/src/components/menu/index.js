/**
 * Menu application
 */

import React, {Component} from 'react';
import ClassNames from 'zol-class-names';
import {SECOND} from '../../../constants';


class Menu extends Component {
  /**
   * Class constructor
   *
   * @param {Object} props - React element properties
   */
  constructor(props) {
    super(props);

    this.state = {
      'menuOpen': false,
      'scalePosition': 0
    };
  }

  /**
   * React life-cycle method, invoked immediately after a component is mounted
   */
  componentDidMount() {
    const socket = new WebSocket(`ws://${window.location.host}/ws/common/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (typeof data.scale_position !== 'undefined') {
        this.setState({
          'menuOpen': true,
          'scalePosition': data.scale_position
        });

        this.menuOpenTimer = setTimeout(() => {
          this.setState({'menuOpen': false});
        }, 15 * SECOND);
      }
      switch (data.scale_position) {
        case 0:
          window.location = '/';
          break;
        case 1:
          window.location = '/weather';
          break;
        case 2:
          window.location = '/wifi';
          break;
        default:
          console.error(`unknown-route: ${data}`);
          break;
      }
    };
    socket.onclose = (event) => {
      console.log(event);
    };
  }

  /**
   * React component life-cycle method, invoked immediately before a component is unmounted
   */
  componentWillUnmount() {
    clearInterval(this.menuOpenTimer);
  }

  /**
   * When called, it should examine this.props and this.state and return a single React element.
   *
   * @returns {Object} - Single React element
   */
  render() {
    const {menuOpen, scalePosition} = this.state;
    const menuClasses = new ClassNames('vertical-menu');
    const photoClasses = new ClassNames();
    const weatherClasses = new ClassNames();
    const wifiClasses = new ClassNames();

    if (menuOpen === false) {
      menuClasses.add('hide');
    } else {
      menuClasses.remove('hide');
    }

    if (location.pathname === '/' || location.pathname === '/photos/') {
      photoClasses.add('active');
    }
    if (location.pathname === '/weather/') {
      weatherClasses.add('active');
    }
    if (location.pathname === '/wifi/') {
      wifiClasses.add('active');
    }

    photoClasses.remove('focus');
    weatherClasses.remove('focus');
    wifiClasses.remove('focus');

    switch(scalePosition) {
      case 0:
        photoClasses.add('focus');
        break;
      case 1:
        weatherClasses.add('focus');
        break;
      case 2:
        wifiClasses.add('focus');
        break;
    }

    return (
      <div className={menuClasses.get()}>
        <a className={photoClasses.get()}>Photos</a>
        <a className={weatherClasses.get()}>Weather</a>
        <a className={wifiClasses.get()}>WiFi Password</a>
      </div>
    );
  }
}

export default Menu;
