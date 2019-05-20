
/**
 * Wifi application
 */


import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Wifi extends Component {
    /**
     * React lifecycle method, invoked immediately after a component is mounted
     */
    componentDidMount() {
        const {getWifi} = this.props;

        if (typeof getWifi === 'function') {
            getWifi();
        }
    }

    /**
     * React component lifecycle method, invoked immediately before a component is unmounted
     */
    componentWillUnmount() {
    }

    /**
     * When called, it should examine this.props and this.state and return a single React element.
     *
     * @returns {Object} - Single React element
     */
    render() {
        const {qrCode} = this.props;

        return <div className="container text-center">
            <h1>WIFI</h1>
            <img src={qrCode} alt="wifi password" />
            <h1>LANdo-guest</h1>
        </div>;
    }
}

Wifi.propTypes = {
    'qrCode': PropTypes.string,
    'getWifi': PropTypes.func.isRequired
};

export default Wifi;
