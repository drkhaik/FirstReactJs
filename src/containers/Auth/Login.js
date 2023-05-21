import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';
import { KeyCodeUtils } from '../../utils';

// import adminService from '../../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.btnLogin = React.createRef();
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            message: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value)
    }

    handleLogin = async () => {
        // console.log('all state', this.state)
        // clear error message every single request
        this.setState({
            message: ''
        })
        try {
            let data = await handleLoginAPI(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    message: data.message,
                })
            }
            if (data && data.errCode === 0) {
                //to do
                this.props.userLoginSuccess(data.user)
                console.log("successful")
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        message: error.response.data.message
                    })
                }
            }
            console.log('hoidanit', error.response)
        }
    }

    showHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }


    handleKeyDownEnter = (event) => {
        const keyCode = event.keyCode;
        // if (event.key === 'Enter' || event.key === 13) {

        // }
        if (keyCode === KeyCodeUtils.ENTER) {
            event.preventDefault();
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login </div>
                        <div className='col-12 form-group login-input'>
                            <label>Username: </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDownEnter(event)}
                                />

                                <span className='eye' onClick={() => { this.showHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </span>
                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.message}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={(event) => { this.handleLogin(event) }}>Log in</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-passwor'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

