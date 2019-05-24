/* global describe, expect, jest, it */

import '../setup';

import {checkStatus, fetchJSON} from './base';

describe('Base', () => {
    it('return response on 200', () => {
        const response = {
            'json': () => {},
            'status': 200
        };

        const status = checkStatus(response);

        expect(status).toEqual(response);
    });

    it('return promise error on 404', (done) => {
        const response = {
            'json': () => {},
            'status': 404
        };

        checkStatus(response)
            .catch((error) => {
                expect(error.message).toEqual('404 error, api not found');
                done();
            });
    });

    it('return promise error on 500', (done) => {
        const response = {
            'json': () => {},
            'status': 500
        };

        checkStatus(response)
            .catch((error) => {
                expect(error.message).toEqual('500 error, something went wrong');
                done();
            });
    });

    it('should call the json method', () => {
        const response = {
            'json': () => {}
        };
        const spy = jest.spyOn(response, 'json');

        fetchJSON(response);
        expect(spy).toHaveBeenCalled();
    });
});

