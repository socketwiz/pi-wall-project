/* global describe, it */

import {HomeContainer} from '../index';
import {expect} from 'chai';
import {mount} from 'enzyme';
import React from 'react';

describe('<HomeContainer />', () => {
    it('should render the Home container', () => {
        const wrapper = mount(<HomeContainer />);
        expect(wrapper.find('.home')).to.have.length(1);
    });
});

