import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ggPlay from '../../../assets/Google_Play_Store_badge_EN.svg.webp';
import appStore from '../../../assets/appStore.png';

class About extends Component {

    render() {
        // let settings = this.props.settings;
        // console.log(settings);

        return (
            <>
                <div className='main-section section-about'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Truyền thông nói gì về BookingCare </span>
                        </div>
                        <div className='section-content'>
                            <div className='content-left'>
                                <iframe width="100%"
                                    src="https://www.youtube.com/embed/FyDQljKtWnI"
                                    title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <div className='content-right'>
                                <p>Chương trình cà phê khởi nghiệp của VTV1 - Đài truyền hình Việt Nam giới thiệu Nền tảng đặt khám bác sĩ chuyên khoa BookingCare. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='main-section section-download'>
                    <div className='section-container'>
                        <h2>Tải ứng dụng BookingCare Minus</h2>
                        <ul className='app-feature'>
                            <li><span><i className="fas fa-check"></i></span> Đặt khám nhanh hơn</li>
                            <li><span><i className="fas fa-check"></i></span> Nhận thông báo từ hệ thống</li>
                            <li><span><i className="fas fa-check"></i></span> Nhận hướng dẫn đi khám chi tiết</li>
                        </ul>
                        <div className='app-link'>
                            <a href=''>
                                <img className='app-img' src={ggPlay} />
                            </a>
                            <a href=''>
                                <img className='app-img' src={appStore} />
                            </a>
                        </div>
                    </div>
                </div>
            </>

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
