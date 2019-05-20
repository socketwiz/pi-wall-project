/*
 *
 * Wifi actions
 *
 */

export const SET_QR_CODE = 'SET_QR_CODE';

/**
 * Set the event data in the redux store
 *
 * @param {Object} event - data to store
 */
export function setQrCode(qrCode) {
    return {
        'type': SET_QR_CODE,
        'qrCode': qrCode
    };
}

