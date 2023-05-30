import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { verifyAnAppointmentService } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import "./VerifyEmail.scss"

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verifyStatus: false,
            codeVerify: 0,
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let timeType = urlParams.get('time');
            let res = await verifyAnAppointmentService({
                token: token,
                doctorId: doctorId,
                timeType: timeType,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    verifyStatus: true,
                    codeVerify: res.errCode
                })
            } else {
                this.setState({
                    verifyStatus: true,
                    codeVerify: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

    }

    render() {
        let { verifyStatus, codeVerify } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>

                    {verifyStatus === false
                        ?
                        <div>
                            <span className='text-center'>Loading Data...</span>
                        </div>
                        : <div>
                            {codeVerify === 0
                                ?
                                <>
                                    <div className='verify-info text-success'> <FormattedMessage id="client.verify-email.verify-success" /></div>
                                </>
                                : <>
                                    <div className='verify-info text-danger'><FormattedMessage id="client.verify-email.verify-fail" /></div>
                                </>}
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
