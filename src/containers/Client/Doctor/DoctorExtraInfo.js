import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from '../../../utils';
import { getExtraInfoDoctorByIdService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowExtraInfo: false,
            allExtraInfo: [],
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            // console.log("check res get extra info", res)
            if (res && res.errCode === 0) {
                this.setState({
                    allExtraInfo: res.data ? res.data : []
                })
            }
        }
    }

    showHideExtraInfo = (status) => {
        this.setState({
            isShowExtraInfo: status,
        })
    }
    render() {
        let { isShowExtraInfo, allExtraInfo } = this.state;
        let language = this.props.lang;
        // console.log("check state extra info", this.state)
        let priceVi = ''; let priceEn = '';
        if (allExtraInfo && allExtraInfo.priceData) {
            priceVi = `${allExtraInfo.priceData.valueVi}`
            priceEn = `${allExtraInfo.priceData.valueEn}`
        }
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="client.doctor-extra-info.address" /></div>
                    <div className='name-clinic'> {allExtraInfo && allExtraInfo.nameClinic ? allExtraInfo.nameClinic : ''} </div>
                    <div className='detail-address'> {allExtraInfo && allExtraInfo.addressClinic ? allExtraInfo.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowExtraInfo === false ?
                        <div>
                            <span className='text-price-show'><FormattedMessage id="client.doctor-extra-info.price" />
                                <span className='price'>
                                    {language === LANGUAGES.VI ?
                                        <NumberFormat value={priceVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                        :
                                        <NumberFormat value={priceEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                    }
                                </span>
                            </span>

                            <span className='show-detail' onClick={() => this.showHideExtraInfo(true)}> <FormattedMessage id="client.doctor-extra-info.show-detail" />
                            </span>
                        </div>
                        :
                        <div>
                            <div className='text-price-hide'><FormattedMessage id="client.doctor-extra-info.price" />
                            </div>
                            <div className='payment-info'>
                                <div className='mb-2'>
                                    <span className='font-weigh-bold'><FormattedMessage id="client.doctor-extra-info.price" /> </span>
                                    <span className='float-right font-italic'>{language === LANGUAGES.VI ?
                                        <NumberFormat value={priceVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                        :
                                        <NumberFormat value={priceEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                    } </span>
                                </div>
                                <div className='detail-info'>{allExtraInfo && allExtraInfo.note ? allExtraInfo.note : ''}</div>
                            </div>
                            <div className='note'>
                                <div>
                                    <FormattedMessage id="client.doctor-extra-info.payment-method" />
                                    <span> {allExtraInfo && allExtraInfo.paymentData && language === LANGUAGES.VI ? allExtraInfo.paymentData.valueVi : ""} </span>
                                    <span> {allExtraInfo && allExtraInfo.paymentData && language === LANGUAGES.EN ? allExtraInfo.paymentData.valueEn : ""}</span>
                                </div>
                            </div>
                            <div className='mt-3'><span className='hide-detail' onClick={() => this.showHideExtraInfo(false)}> <FormattedMessage id="client.doctor-extra-info.hide-detail" /></span></div>
                        </div>
                    }

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
