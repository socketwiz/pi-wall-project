
/*
 * CalendarContainer
 */

import Calendar from '../../components/calendar';
import {connect} from 'react-redux';
import {setCalendar} from '../../actions/calendar';
import 'whatwg-fetch';
import {withRouter} from 'react-router';

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        'getCalendar': () => {
        }
    };
}

const CalendarApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar);

export default withRouter(CalendarApp);
