
/*
 * BusContainer
 */

import {connect} from 'react-redux';
import {setHoliday, setSchedule} from '../actions/bus';
import Bus from '../components/bus';

function mapStateToProps(state) {
  return {
    'pickups': state.busReducer.pickups,
    'holidays': state.busReducer.holidays
  };
}

function mapDispatchToProps(dispatch) {
  return {
    'getSchedules': () => {
      fetch('/bus/api/schedule')
        .then((response) => response.json())
        .then((data) => {
          dispatch(setSchedule(data))
        })
        .catch((error) => {
          dispatch(setSchedule({
            'error': error.message
          }));
        });
    },
    'getHolidays': () => {
      fetch('/bus/api/holiday')
        .then((response) => response.json())
        .then((data) => {
          dispatch(setHoliday(data))
        })
        .catch((error) => {
          dispatch(setHoliday({
            'error': error.message
          }));
        });
    }
  };
}

const BusApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bus);

export default BusApp;
