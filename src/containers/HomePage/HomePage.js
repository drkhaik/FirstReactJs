import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import HealthFacilities from './Section/HealthFacilities';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { set } from 'lodash';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        let settingsHB = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <HealthFacilities settings={settings} />
                <OutstandingDoctor settings={settings} />
                <Handbook settings={settingsHB} />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
