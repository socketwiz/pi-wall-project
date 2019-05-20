/* global describe, it */

import {expect} from 'chai';
import {setForecast, setWeather} from '../weather';
import {SET_FORECAST, SET_WEATHER} from '../weather';

describe('Weather actions', () => {
    describe('Set forecast', () => {
        it('has a type of SET_FORECAST', () => {
            const expected = {
                'type': SET_FORECAST,
                'data': undefined
            };
            expect(setForecast()).to.eql(expected);
        });

        it('has a type of SET_WEATHER', () => {
            const expected = {
                'type': SET_WEATHER,
                'data': undefined
            };
            expect(setWeather()).to.eql(expected);
        });
    });
});
