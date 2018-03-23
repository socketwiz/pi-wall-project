
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class Header extends Component {
    render() {
        const {title} = this.props;

        return <div className="header">
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>;
    }
}

Header.propTypes = {
    'title': PropTypes.string
};
