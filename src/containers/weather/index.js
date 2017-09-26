/*
 * WeatherContainer
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Weather from '../../components/weather';
import * as WeatherActions from '../../actions/weather';

export class WeatherContainer extends Component {
    render() {
        return (
            <Weather />
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(WeatherActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);

