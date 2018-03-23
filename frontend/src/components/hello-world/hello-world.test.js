/* global describe, expect, it */

import '../../../setup';

import {shallow} from 'enzyme';
import React from 'react';
import HelloWorld from './index';
import fetchMock from 'fetch-mock';

fetchMock.get('/api-v1/hello-world', []);

describe('HelloWorld main page', () => {
    it('renders HelloWorld without crashing', () => {
        const wrapper = shallow(<HelloWorld />);

        expect(wrapper).toMatchSnapshot();
    });
});
