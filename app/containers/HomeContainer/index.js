/*
 *
 * HomeContainer
 *
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Home from '../../components/Home';
import React, {Component} from 'react';
import * as HomeContainerActions from '../../actions/home-container';

export class HomeContainer extends Component {
    render() {
        return <Home />;
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(HomeContainerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

