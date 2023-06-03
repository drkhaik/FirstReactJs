import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialtyService } from '../../../services/userService';
import { withRouter } from 'react-router';


class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrSpecialty: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.outstandingDoctorRedux !== this.props.outstandingDoctorRedux) {
        //     this.setState({
        //         arrDoctor: this.props.outstandingDoctorRedux
        //     })
        // }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService();
        // console.log("check res", res)
        if (res && res.errCode === 0) {
            this.setState({
                arrSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (infoSpecialty) => {
        console.log('view info: ', infoSpecialty)
        // redirect
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${infoSpecialty.id}`);
        }
    }


    render() {
        let settings = this.props.settings;
        // console.log('specialty check: ', settings);
        let { arrSpecialty } = this.state;
        return (
            <div className='main-section section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="home-page.specialty-popular" /> </span>
                        <button className='btn-section'><FormattedMessage id="home-page.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrSpecialty && arrSpecialty.length > 0 &&
                                arrSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className='img section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}> </div>
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
