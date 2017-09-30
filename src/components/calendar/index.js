
/**
 * Calendar application
 */

import {pushNavigation} from '../../base';
import './calendar.css';
import React, {Component} from 'react';

class Calendar extends Component {
    /**
     * Class constructor
     *
     * @param {Object} props - React element properties
     */
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    /**
     * React lifecycle method, invoked immediately after a component is mounted
     */
    componentDidMount() {
        pushNavigation();
    }

    /**
     * When called, it should examine this.props and this.state and return a single React element.
     *
     * @returns {Object} - Single React element
     */
    render() {
        return (
            <div className="container">
                <h1 className="day">26</h1>
                <div className="date">Tuesday, September 26, 2017</div>
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

export default Calendar;
