
/**
 * Calendar application
 */

import './calendar.css';
import {MINUTE} from '../../constants';
import moment from 'moment';
import PropTypes from 'prop-types';
import {pushNavigation, switchToBus} from '../../base';
import React, {Component} from 'react';

class Calendar extends Component {
    /**
     * React lifecycle method, invoked immediately after a component is mounted
     */
    componentDidMount() {
        const {getCalendar} = this.props;

        pushNavigation();

        if (typeof getCalendar === 'function') {
            getCalendar();
        }

        this.busTimer = setInterval(switchToBus, 1 * MINUTE);
    }

    /**
     * React component lifecycle method, invoked immediately before a component is unmounted
     */
    componentWillUnmount() {
        clearTimeout(this.busTimer);
    }

    /**
     * When called, it should examine this.props and this.state and return a single React element.
     *
     * @returns {Object} - Single React element
     */
    render() {
        let day = moment().format('DD');
        let now = moment().format('dddd, MMMM Do, YYYY');

        return (
            <div className="container">
                <h1 className="day">{day}</h1>
                <div className="date">{now}</div>
                <div className="divider"></div>

                <div className="task">
                    <div className="row">
                        <div className="col-xs-6 heading">M Work</div>
                        <div className="col-xs-6"><span className="pull-right task-time">5:00 AM to 1:30 PM</span></div>
                    </div>
                    <div className="location">
                        Navy Federal Credit Union - ATM141 Security Dr, Winchester, VA, United States
                    </div>
                    <div className="row notes">
                        <div className="col-xs-1">
                            <span>notes</span>
                        </div> 
                        <div className="col-xs-11">
                            <div className="comment">Have a great day!</div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    'getCalendar': PropTypes.func.isRequired
};

export default Calendar;
