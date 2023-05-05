import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class OutstandingDoctor extends Component {

    // OutstandingDoctor

    render() {

        return (
            <div className='main-section section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Bác sĩ nổi bật tuần qua </span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize circle-customize'>
                                <div className='outer-img'>
                                    <div className='img section-outstanding-doctor'> </div>
                                </div>
                                <div className='text text-center'>
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Drkhaik 1 </h3>
                                    <h4>Cơ xương khớp </h4>
                                </div>
                            </div>
                            <div className='section-customize circle-customize'>
                                <div className='outer-img'>
                                    <div className='img section-outstanding-doctor'> </div>
                                </div>
                                <div className='text text-center'>
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Drkhaik 2 </h3>
                                    <h4>Cơ xương khớp </h4>
                                </div>
                            </div>
                            <div className='section-customize circle-customize'>
                                <div className='outer-img'>
                                    <div className='img section-outstanding-doctor'> </div>
                                </div>
                                <div className='text text-center'>
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Drkhaik 3 </h3>
                                    <h4>Cơ xương khớp </h4>
                                </div>
                            </div>
                            <div className='section-customize circle-customize'>
                                <div className='outer-img'>
                                    <div className='img section-outstanding-doctor'> </div>
                                </div>
                                <div className='text text-center'>
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Drkhaik 4 </h3>
                                    <h4>Cơ xương khớp </h4>
                                </div>
                            </div>
                            <div className='section-customize circle-customize'>
                                <div className='outer-img'>
                                    <div className='img section-outstanding-doctor'> </div>
                                </div>
                                <div className='text text-center'>
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Drkhaik 5 </h3>
                                    <h4>Cơ xương khớp </h4>
                                </div>
                            </div>
                            <div className='section-customize circle-customize'>
                                <div className='outer-img'>
                                    <div className='img section-outstanding-doctor'> </div>
                                </div>
                                <div className='text text-center'>
                                    <h3>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Drkhaik 6 </h3>
                                    <h4>Cơ xương khớp </h4>
                                </div>
                            </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
