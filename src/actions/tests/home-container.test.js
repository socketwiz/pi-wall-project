/* global describe, it */

import {expect} from 'chai';
import {
    defaultAction
} from '../home-container';
import {
    DEFAULT_ACTION
} from '../../containers/HomeContainer/constants';

describe('HomeContainer actions', () => {
    describe('Default Action', () => {
        it('has a type of DEFAULT_ACTION', () => {
            const expected = {
                type: DEFAULT_ACTION
            };
            expect(defaultAction()).to.eql(expected);
        });
    });
});
