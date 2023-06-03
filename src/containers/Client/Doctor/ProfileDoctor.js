import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorByIdService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let id = this.props.doctorId;
        let data = await this.getProfileDoctorInfo(id);
        this.setState({
            dataProfile: data
        })
    }

    getProfileDoctorInfo = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdService(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let id = this.props.doctorId;
            let data = await this.getProfileDoctorInfo(id);
            this.setState({
                dataProfile: data
            })
        }

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderBookingScheduleData = (bookingScheduleData) => {
        let language = this.props.lang;
        if (bookingScheduleData && !_.isEmpty(bookingScheduleData)) {
            // console.log("check props from profile doctor", this.props.bookingScheduleData)
            let time = language === LANGUAGES.VI ? bookingScheduleData.timeTypeData.valueVi : bookingScheduleData.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                // JS mili s ,, unix s
                this.capitalizeFirstLetter(moment.unix(+bookingScheduleData.date / 1000).format('dddd - DD/MM/YYYY'))
                :
                moment.unix(+bookingScheduleData.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div> {time} - {date}</div>
                </>
            )
        }
        return <></>

    }

    render() {
        // console.log("check state from profile doctor", this.state)
        // console.log("check props from profile doctor", this.props.bookingScheduleData)
        let { dataProfile } = this.state;
        let { bookingScheduleData } = this.props;
        let language = this.props.lang;
        // console.log("check is sho description", this.props.isShowDescription)
        let nameVi = '', nameEn = '', locationVi = '', locationEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
            locationVi = `${dataProfile.Doctor_Info.provinceData.valueVi}`
            locationEn = `${dataProfile.Doctor_Info.provinceData.valueEn}`
            // priceVi = `${dataProfile.Doctor_Info.priceData.valueVi}`
            // priceEn = `${dataProfile.Doctor_Info.priceData.valueEn}`
        }
        // console.log("check location", locationEn)
        // console.log("check profile", dataProfile)

        return (
            <div className='doctor-profile-container'>
                <div className='doctor-intro'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            <span className='nameDoctor'>
                                <Link to={`/detail-doctor/${this.props.doctorId}`}>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </Link>
                            </span>
                        </div>
                        <div className='down'>
                            {/* isShowDescription={false} */}
                            {dataProfile.Detail_Section && dataProfile.Detail_Section.description
                                && <span>
                                    {dataProfile.Detail_Section.description}
                                </span>
                            }
                            {this.props.isShowLocation === true &&
                                <div className='locationDoctor'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span className=''> {language === LANGUAGES.VI ? locationVi : locationEn} </span>
                                </div>
                            }
                            <div className='datetime'>
                                {this.renderBookingScheduleData(bookingScheduleData)}
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowPrice === true &&

                    <div className='consultation-fee'>

                        <span className='text-price-show'><FormattedMessage id="client.doctor-extra-info.price" />
                            <span className='price'>
                                {language === LANGUAGES.VI &&
                                    <NumberFormat value={dataProfile.Doctor_Info.priceData.valueVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                }
                                {language === LANGUAGES.EN &&
                                    <NumberFormat value={dataProfile.Doctor_Info.priceData.valueEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                                }
                            </span>

                        </span>
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
