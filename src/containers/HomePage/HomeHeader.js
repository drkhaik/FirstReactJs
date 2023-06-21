import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {



    changeLanguage = (language) => {
        // su dung ham` tu mapDispatch
        this.props.changeLanguageAppRedux(language);
    }

    handleReturnHomePage = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    }

    // (function (params) {
    //     var words = ["UI/UX designer", "ABC", "DEF"],
    //     i =0 ;
    //     setInterval(function(){
    //         $('#words').fadeOut(function(){
    //             $(this).html(words[(i = (i + 1) % words.length)]).fadeIn();
    //         });

    //     }, 3000)
    // })();

    render() {
        let language = this.props.lang;
        // console.log('check language: ', language)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} onClick={() => this.handleReturnHomePage()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="home-header.specialty" /> </b></div>
                                <div className='sub-title'> <FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.heath-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-clinic" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.combo" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>
                                <p> <FormattedMessage id="home-header.support" /></p>
                            </div>
                            <div className='change-language'>
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                                </div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment >
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
        //su dung Dispatch de truy cap dc den cac ham` nay thong qua this.props 
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
