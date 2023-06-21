import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import ggPlay from '../../assets/Google_Play_Store_badge_EN.svg.webp';
import appStore from '../../assets/appStore.png';
import { getAllSpecialtyNameService } from '../../services/userService';

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrNameClinic: [],
            i: 0
        }
    }

    val(fn, time) {
        setInterval(fn, time);
    }

    async componentDidMount() {
        let res = await getAllSpecialtyNameService();
        if (res && res.errCode === 0) {
            this.setState({
                arrNameClinic: res.data,
            });
            setInterval(() => {
                this.setState((prevState) => {
                    return {
                        i: (prevState.i + 1) % prevState.arrNameClinic.length,
                    };
                });
            }, 3000);
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

    }

    render() {
        let currentArrayName = this.state.arrNameClinic[this.state.i];
        // let currentArrayName1 = currentArrayName.n;
        return (
            <>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" />
                        </div>
                        <div className='title2'> <b><FormattedMessage id="banner.title2" /> </b></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' id={currentArrayName && currentArrayName.id} placeholder={currentArrayName && currentArrayName.name} />
                        </div>
                        <div className='app-link'>
                            <a href=''>
                                <img className='app-img' src={ggPlay} />
                            </a>
                            <a href=''>
                                <img className='app-img' src={appStore} />
                            </a>
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <ul>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                        <p><FormattedMessage id="banner.specialty" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                        <p><FormattedMessage id="banner.remote" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                        <p><FormattedMessage id="banner.general" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-flask"></i></div>
                                        <p><FormattedMessage id="banner.medical-test" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                        <p><FormattedMessage id="banner.mental" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-notes-medical"></i></div>
                                        <p><FormattedMessage id="banner.dental" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-syringe"></i></div>
                                        <p><FormattedMessage id="banner.surgery" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                        <p><FormattedMessage id="banner.medical-product" /></p>

                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className='icon-child'><i className="fas fa-stopwatch"></i></div>
                                        <p><FormattedMessage id="banner.heath-test" /></p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
