
/**
 * Calendar application
 */

import './calendar.css';
import map from 'lodash/map';
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

    newlineToBr(description) {
        const lines = description.split('\n');
        
        return map(lines, (line, index) => <span className="line" key={index}>{line}</span>);
    }

    /**
     * When called, it should examine this.props and this.state and return a single React element.
     *
     * @returns {Object} - Single React element
     */
    render() {
        const {events} = this.props;
        const day = moment().format('DD');
        const now = moment().format('dddd, MMMM Do, YYYY');
        const taskPartial = map(events, (event, index) => {
            const start = moment()
                .set({'hour': event.dtstart.hour, 'minute': event.dtstart.minute})
                .format('h:mm A');
            const end = moment()
                .set({'hour': event.dtend.hour, 'minute': event.dtend.minute})
                .format('h:mm A');

            return <div className="task" key={index}>
                <div className="row">
                    <div className="col-xs-6 heading">{event.summary}</div>
                    <div className="col-xs-6"><span className="pull-right task-time">{start} to {end}</span></div>
                </div>
                <div className="location">
                    {event.location}
                </div>
                <div className="row notes">
                    <div className="col-xs-1">
                        <span>notes</span>
                    </div> 
                    <div className="col-xs-11">
                        <div className="comment">{this.newlineToBr(event.description)}</div>
                    </div> 
                </div>
            </div>;
        });

        return <div className="container">
            <h1 className="day">{day}</h1>
            <div className="date">{now}</div>
            <div className="divider"></div>

            {taskPartial}
        </div>;
    }
}

Calendar.propTypes = {
    'events': PropTypes.array,
    'getCalendar': PropTypes.func.isRequired
};

export default Calendar;
