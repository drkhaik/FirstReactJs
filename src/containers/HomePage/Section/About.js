import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        // let settings = this.props.settings;
        // console.log(settings);

        return (
            <div className='main-section section-about'>
                <div className='section-about-header'>
                    <span className='title-section'>Truyền thông nói gì về BookingCare </span>
                    <span className='title-section'> Cẩm nang</span>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Chương trình cà phê khởi nghiệp của VTV1 - Đài truyền hình Việt Nam giới thiệu Nền tảng đặt khám bác sĩ chuyên khoa BookingCare. </p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
