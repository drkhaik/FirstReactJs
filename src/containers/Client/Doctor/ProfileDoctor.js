import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorByIdService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

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
        if (prevProps.lanag !== this.props.lang) {

        }
        // if (prevProps.doctorId !== this.props.doctorId) {
        //      this.getProfileDoctorInfo(this.props.doctorId);
        //     this.setState({
        //         dataProfile: data
        //     })
        // }

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
        let nameVi = '', nameEn = '', priceVi = '', priceEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
            priceVi = `${dataProfile.Doctor_Info.priceData.valueVi}`
            priceEn = `${dataProfile.Doctor_Info.priceData.valueEn}`
        }
        return (
            <div className='doctor-profile-container'>
                <div className='doctor-intro'>
                    <div className='content-left' style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {/* isShowDescription={false} */}
                            {dataProfile.Detail_Section && dataProfile.Detail_Section.description
                                && <span>
                                    {dataProfile.Detail_Section.description}
                                </span>
                            }
                            <div className='datetime'>
                                {this.renderBookingScheduleData(bookingScheduleData)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='consultation-fee'>

                    <span className='text-price-show'><FormattedMessage id="client.doctor-extra-info.price" />
                        <span className='price'>
                            {language === LANGUAGES.VI ?
                                <NumberFormat value={priceVi} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                                :
                                <NumberFormat value={priceEn} displayType={'text'} thousandSeparator={true} suffix={'$'} />
                            }
                        </span>

                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
