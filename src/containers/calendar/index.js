
/*
 * CalendarContainer
 */

import Calendar from '../../components/calendar';
import {connect} from 'react-redux';
import {setEvents} from '../../actions/calendar';
import 'whatwg-fetch';
import {withRouter} from 'react-router';

function mapStateToProps(state) {
    return {
        'events': state.calendarReducer.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        'getCalendar': () => {
            fetch('/calendar-family')
                .then(response => response.json().then(data => {
                    dispatch(setEvents(data));
                }))
                .catch(function fetchError(error) {
                    console.error(error);
                });
        }
    };
}

const CalendarApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);

export default withRouter(CalendarApp);
