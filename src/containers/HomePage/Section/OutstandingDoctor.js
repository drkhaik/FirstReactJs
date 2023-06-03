import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router'


class OutstandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.outstandingDoctorRedux !== this.props.outstandingDoctorRedux) {
            this.setState({
                arrDoctor: this.props.outstandingDoctorRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadOutstandingDoctor();
    }

    handleViewDetailDoctor = (infoDoctor) => {
        console.log('view info: ', infoDoctor)
        // redirect
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${infoDoctor.id}`);
        }
    }

    render() {
        // console.log('check outstandingDoctorRedux ', this.props.outstandingDoctorRedux)
        let arrDoctorRender = this.state.arrDoctor;
        let language = this.props.lang;
        // arrDoctorRender = arrDoctorRender.concat(arrDoctorRender).concat(arrDoctorRender)
        return (
            <div className='main-section section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="home-page.outstanding-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="home-page.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctorRender && arrDoctorRender.length > 0 &&
                                arrDoctorRender.map((item, index) => {
                                    // if (index == 0) {
                                    //     console.log('check item: ', item)
                                    // }
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.firstName} ${item.lastName}`
                                    let positionVi = `${item.positionData.valueVi}`
                                    let positionEn = `${item.positionData.valueEn}`
                                    return (
                                        <div className='section-customize circle-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='outer-img'>
                                                <div className='img section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                > </div>
                                            </div>
                                            <div className='text text-center'>
                                                <h3>{language === LANGUAGES.VI
                                                    ? <> {positionVi} <span className='outstanding-doctor-name'> {nameVi}</span> </>
                                                    : <> {positionEn} <span className='outstanding-doctor-name'> {nameEn}</span> </>}</h3>
                                                <h4>Cơ xương khớp </h4>
                                            </div>
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
        outstandingDoctorRedux: state.admin.outstandingDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadOutstandingDoctor: () => dispatch(actions.getOutstandingDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
