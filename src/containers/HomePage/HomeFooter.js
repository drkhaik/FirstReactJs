import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {

    render() {
        // let settings = this.props.settings;
        // console.log(settings);

        return (
            <div className='home-footer'>
                <p>&copy; 2023 Drkhaik. For more information, please visit my github <a href="https://github.com/drkhaik" target='_blank' >&#8594; Click here &#8592;</a> </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
