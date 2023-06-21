import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import logo from '../../assets/logo.svg';
import bocongthuong from '../../assets/bo-cong-thuong.svg';

class HomeFooter extends Component {

    render() {
        // let settings = this.props.settings;
        // console.log(settings);

        return (
            <>
                <div className='home-footer-wrapper'>
                    <div className='home-footer-container container'>
                        <div className='row'>
                            <div className='brand-section col-sm-6 col-12'>
                                <div className='brand-logo'>
                                    <img className='logo' src={logo} />
                                </div>
                                <div>
                                    <p className='font-weight-bold'>Công ty Cổ phần Công nghệ BookingCare</p>
                                    <p><span><i className="fas fa-map-marker-alt"></i> </span>
                                        Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                                    </p>
                                    <p><span><i className="fas fa-check"></i></span>
                                        ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                                    </p>
                                </div>
                                <div>
                                    <img className='header-logo' src={bocongthuong} />
                                </div>
                            </div>
                            <ul className='menu-section col-sm-3 col-12'>
                                <li> Liên hệ hợp tác</li>
                                <li> Danh bạ y tế</li>
                                <li> Sức khỏe doanh nghiệp</li>
                                <li> Gói chuyển đổi số doanh nghiệp</li>
                                <li> Tuyển dụng</li>
                                <li> Câu hỏi thường gặp</li>
                                <li> Điều khoản sử dụng</li>
                                <li> Chính sách Bảo mật</li>
                                <li> Quy trình hỗ trợ giải quyết khiếu nại</li>
                                <li> Quy chế hoạt động</li>
                            </ul>
                            <div className='address-contact-section col-sm-3 col-12'>
                                <div className='address-HN'>
                                    <span> Trụ sở tại Hà Nội</span>
                                    <p>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                                </div>
                                <div className='address-HCM'>
                                    <span> Văn phòng tại TP Hồ Chí Minh</span>
                                    <p> Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                                </div>
                                <div className='support'>
                                    <span> Hỗ trợ khách hàng</span>
                                    <p>support@bookingcare.vn (7h30 - 18h)</p>
                                </div>
                                <div className='contact'>
                                    <span>Hotline</span>
                                    <p> 024-7301-2468 (7h30 - 18h)</p>
                                </div>
                            </div>
                        </div>
                        <div className='download-note'>
                            <p> <span><i className="fas fa-mobile-alt"></i></span>  Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: <span>Android iPhone/iPad Khác</span> </p>
                        </div>
                    </div>

                    <div className='home-footer-copyright'>
                        <p>&copy; 2023 Drkhaik. For more information, please visit my github <a href="https://github.com/drkhaik" target='_blank' >&#8594; Click here &#8592;</a> </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
