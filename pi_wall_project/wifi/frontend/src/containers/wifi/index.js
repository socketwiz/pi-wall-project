
/*
 * WifiContainer
 */

import Wifi from '../../components/wifi';
import {connect} from 'react-redux';
import {setQrCode} from '../../actions/wifi';

function mapStateToProps(state) {
    return {
        'qrCode': state.wifiReducer.qrCode
    };
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary);
}

function mapDispatchToProps(dispatch) {
    return {
        'getWifi': () => {
            fetch('https://chart.googleapis.com/chart?cht=qr&chl=n0waySucka&chs=500x500&choe=UTF-8&chld=L')
                .then(response => response.arrayBuffer().then(buffer => {
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = arrayBufferToBase64(buffer);

                    dispatch(setQrCode(`${base64Flag}${imageStr}`));
                }))
                .catch(function fetchError(error) {
                    console.error(error);
                });
        }
    };
}

const WifiApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Wifi);

export default WifiApp;

