import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleInfoByDateService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allAvailableDays: [],
            allAvailableSchedule: [],
            isOpenBookingModal: false,
            bookingScheduleData: {},
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async componentDidMount() {
        let language = this.props.lang;
        let arrDay = this.getArrDay(language);

        let allAvailableSchedule = [];
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleInfoByDateService(this.props.doctorIdFromParent, arrDay[0].value);
            // console.log("check res get schedule", res)
            if (res && res.errCode === 0) {
                allAvailableSchedule = res.data ? res.data : [];

            }
        }
        this.setState({
            allAvailableDays: arrDay,
            allAvailableSchedule: allAvailableSchedule
        })
    }

    getArrDay = (language) => {
        let arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            // add them ngay trong thu vien moment
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('MM/DD');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - MM/DD');
                }
            }

            object.value = moment(new Date().setHours(0, 0, 0, 0)).add(i, 'days').valueOf();

            arrDay.push(object);
        }

        return arrDay;

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            let arrDay = this.getArrDay(this.props.lang);
            this.setState({
                allAvailableDays: arrDay
            })
        }
        // render data in the first time ~ schedule time for today
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let arrDay = this.getArrDay(this.props.lang);
            let res = await getScheduleInfoByDateService(this.props.doctorIdFromParent, arrDay[0].value);
            // console.log("check res get schedule", res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableSchedule: res.data ? res.data : []
                })
            }
        }

    }

    handleOnChangeSelectDay = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            // console.log("check on change select", event.target.value);
            let selectedDate = event.target.value;
            let res = await getScheduleInfoByDateService(doctorId, selectedDate);
            // console.log("check response schedule info by date", res) 
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableSchedule: res.data ? res.data : []
                })
            }
        }
    }

    toggleBookingModal = () => {
        this.setState({
            isOpenBookingModal: !this.state.isOpenBookingModal,
        })
    }

    handleClickScheduleTime = (timeAndDoctorInfo) => {
        this.setState({
            isOpenBookingModal: true,
            bookingScheduleData: timeAndDoctorInfo
        })
        // console.log("check time", timeAndDoctorInfo) 
    }

    render() {
        let { allAvailableDays, allAvailableSchedule } = this.state;
        let language = this.props.lang;
        // console.log("check state:", this.state)
        // console.log("check props id:", this.props.doctorIdFromParent)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-available-day'>
                        <select className='select-day' onChange={(event) => this.handleOnChangeSelectDay(event)}>
                            {allAvailableDays && allAvailableDays.length > 0
                                && allAvailableDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}> {item.label} </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className='all-available-schedule'>
                        <div className='text-calendar'>
                            <span><i className='fas fa-calendar-alt'></i> <FormattedMessage id="client.doctor-schedule.schedule-title" /> </span>
                        </div>
                        <div className='schedule-time'>
                            {allAvailableSchedule && allAvailableSchedule.length > 0 ?
                                <>
                                    <div className='select-schedule'>
                                        {allAvailableSchedule.map((item, index) => {
                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='note'>
                                        <span><FormattedMessage id="client.doctor-schedule.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="client.doctor-schedule.book-free" /></span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'><FormattedMessage id="client.doctor-schedule.no-schedule" /> </div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={this.state.isOpenBookingModal}
                    toggleFromParent={this.toggleBookingModal}
                    bookingScheduleData={this.state.bookingScheduleData}
                    doctorId={this.state.bookingScheduleData.doctorId}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
