
import {checkStatus, fetchJSON} from '../base';
import {connect} from 'react-redux';
import HelloWorld from '../components/hello-world';
import {updateHello, updateHellos} from '../actions/hello-world';
import {withRouter} from 'react-router';
import 'whatwg-fetch';

const mapStateToProps = state => {
    return {
        'hellos': state.helloWorldReducer.hellos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        'getMessage': () => {
            return fetch('/api/Hellos')
                .then(checkStatus)
                .then(fetchJSON)
                .then(data => {
                    if (data) {
                        dispatch(updateHellos(data));
                    }
                });
        },
        'putMessage': (value) => {
            const options = {
                'method': 'post',
                'headers': {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(value)
            };

            return fetch('/api/Hellos', options)
                .then(checkStatus)
                .then(fetchJSON)
                .then(data => {
                    if (data) {
                        dispatch(updateHello(data));
                    }
                });
        }
    };
};

const HelloWorldApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(HelloWorld);

export default withRouter(HelloWorldApp);
