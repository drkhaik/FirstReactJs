import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import _ from 'lodash';
import { USER_ROLE } from '../../utils';
// import { changeLanguageApp } from '../../store/actions';


class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuHeader: []
        }
    }

    changeLanguage = (language) => {
        // alert("ok");
        // su dung ham` tu mapDispatch
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        // console.log('hoi dan it check user info from redux', this.props.userInfo);
        // Phan quyen user
        let menu = [];
        let { userInfo } = this.props;
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuHeader: menu
        })
    }

    render() {
        const { processLogout, lang, userInfo } = this.props;
        // let language = this.props.lang;
        // console.log('check user info: ', this.props.userInfo)
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuHeader} />
                </div>

                <div className='languages'>
                    <span className='welcome'> <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                    </span>
                    <div className={lang === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span></div>
                    <div className={lang === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // goi user info
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
