/* global describe, it */

import {expect} from 'chai';
import Home from '../index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Home />', () => {
    it('should render the Home component', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('.home')).to.have.length(1);
    });
});

