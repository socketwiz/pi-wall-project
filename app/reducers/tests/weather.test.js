/* global describe, it */

import {expect} from 'chai';
import weatherReducer from '../weather';

describe('weatherReducer', () => {
    it('returns the initial state', () => {
        expect(weatherReducer(undefined, {})).to.eql({});
    });
});

