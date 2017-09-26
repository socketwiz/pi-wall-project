/* global describe, it */

import {expect} from 'chai';
import {
    defaultAction
} from '../weather';
import {
    DEFAULT_ACTION
} from '../../containers/Weather/constants';

describe('Weather actions', () => {
    describe('Default Action', () => {
        it('has a type of DEFAULT_ACTION', () => {
            const expected = {
                type: DEFAULT_ACTION
            };
            expect(defaultAction()).to.eql(expected);
        });
    });
});
