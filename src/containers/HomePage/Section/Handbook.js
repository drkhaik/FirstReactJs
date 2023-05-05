import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";


class Handbook extends Component {

    render() {
        // let settingsHB = this.props.settings;
        // settingsHB.slidesToShow = 2;
        // console.log(settingsHB.slidesToShow);
        // console.log('check handbook setting: ', settingsHB);
        return (
            <div className='main-section section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Cẩm nang</span>
                        <button className='btn-section'>Tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        {/* <Slider {...settingsHB}> */}
                        <Slider {...this.props.settings}>
                            <a className='section-customize handbook-customize'>
                                <div className='outer-img'>
                                    <div className='img section-handbook'> </div>
                                </div>
                                <div className='handbook-title'>
                                    <p>Nâng cơ mặt phương pháp nào tốt? 5 Địa chỉ nâng cơ uy tín tại Hà Nội 1</p>
                                </div>
                            </a>
                            <div className='section-customize handbook-customize'>
                                <div className='outer-img'>
                                    <div className='img section-handbook'> </div>
                                </div>
                                <div className='handbook-title'>
                                    <div>Nâng cơ mặt phương pháp nào tốt? 5 Địa chỉ nâng cơ uy tín tại Hà Nội 2</div>
                                </div>
                            </div>
                            <div className='section-customize handbook-customize'>
                                <div className='outer-img'>
                                    <div className='img section-handbook'> </div>
                                </div>
                                <div className='handbook-title'>
                                    <div>Nâng cơ mặt phương pháp nào tốt? 5 Địa chỉ nâng cơ uy tín tại Hà Nội 3</div>
                                </div>
                            </div>
                            <div className='section-customize handbook-customize'>
                                <div className='outer-img'>
                                    <div className='img section-handbook'> </div>
                                </div>
                                <div className='handbook-title'>
                                    <div>Nâng cơ mặt phương pháp nào tốt? 5 Địa chỉ nâng cơ uy tín tại Hà Nội 4</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
