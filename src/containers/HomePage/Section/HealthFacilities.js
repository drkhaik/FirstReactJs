import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class HealthFacilities extends Component {

    // HealthFacilities

    render() {

        return (
            <div className='main-section section-health-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Cơ sở y tế nổi bật </span>
                        <button className='btn-section'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacilities);
