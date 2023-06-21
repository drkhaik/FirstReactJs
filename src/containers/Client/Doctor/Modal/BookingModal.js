import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
// import { getProfileDoctorByIdService } from '../../../../services/userService';
import _ from 'lodash';
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { bookAnAppointmentService, getAddressClinicByDoctorIdService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            phoneNumber: '',
            birthday: '',
            address: '',
            reason: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
            date: '',

            genders: [],
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        if (this.props.bookingScheduleData && !_.isEmpty(this.props.bookingScheduleData)) {
            let doctorId = this.props.bookingScheduleData.doctorId;
            let timeType = this.props.bookingScheduleData.timeType;
            let date = this.props.bookingScheduleData.date;
            this.setState({
                doctorId: doctorId,
                timeType: timeType,
                date: date
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;
        if (inputData && inputData.length > 0) {
            inputData.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                genders: this.buildDataInputSelect(this.props.genderRedux)
            })
        }
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genders: this.buildDataInputSelect(this.props.genderRedux)
            })
        }
        if (prevProps.bookingScheduleData !== this.props.bookingScheduleData) {
            console.log("console log booking schedule data", this.props.bookingScheduleData)
            if (this.props.bookingScheduleData && !_.isEmpty(this.props.bookingScheduleData)) {
                let doctorId = this.props.bookingScheduleData.doctorId;
                let timeType = this.props.bookingScheduleData.timeType;
                let date = this.props.bookingScheduleData.date;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    date: date
                })
            }
        }

    }

    toggle = () => {
        // lay function tu cha sang con qua props
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
        let exp = new Date(this.state.birthday).setHours(0, 0, 0, 0);
        // console.log("check example", exp)
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedGender: selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedGender)
        );

    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildBookingScheduleData = (bookingScheduleData) => {
        let language = this.props.lang;
        if (bookingScheduleData && !_.isEmpty(bookingScheduleData)) {
            // console.log("check props from profile doctor", this.props.bookingScheduleData)
            let time = language === LANGUAGES.VI ? bookingScheduleData.timeTypeData.valueVi : bookingScheduleData.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                // JS mili s ,, unix s
                this.capitalizeFirstLetter(moment.unix(+bookingScheduleData.date / 1000).format('dddd - DD/MM/YYYY'))
                :
                moment.unix(+bookingScheduleData.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} - ${date}`

        }
        return ''

    }

    buildDoctorName = (bookingScheduleData) => {
        let language = this.props.lang;
        if (bookingScheduleData && !_.isEmpty(bookingScheduleData)) {
            // console.log("check props from profile doctor", this.props.bookingScheduleData)
            let name = language === LANGUAGES.VI
                ? `${bookingScheduleData.doctorData.lastName} ${bookingScheduleData.doctorData.firstName}`
                : `${bookingScheduleData.doctorData.firstName} ${bookingScheduleData.doctorData.lastName}`
            return name;

        }
        return ''

    }

    buildBirthday = (birthday) => {
        let language = this.props.lang;
        if (birthday) {
            // console.log("check birthday", this.state.birthday)
            let date = language === LANGUAGES.VI ?
                // JS mili s ,, unix s
                moment(birthday).format('DD/MM/YYYY')
                :
                moment(birthday).format('MM/DD/YYYY')

            return `${date}`

        }
        return ''

    }

    handleBookingAnAppointment = async () => {
        let resClinic = await getAddressClinicByDoctorIdService(this.state.doctorId);
        let formattedBirthday = this.buildBirthday(this.state.birthday);
        let dateBookingString = this.buildBookingScheduleData(this.props.bookingScheduleData);
        let dateBooking = this.props.bookingScheduleData.date;
        let doctorName = this.buildDoctorName(this.props.bookingScheduleData);
        this.props.isLoadingAppRedux(true)
        let res = await bookAnAppointmentService({
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            birthday: formattedBirthday,
            address: this.state.address ? this.state.address : '',
            reason: this.state.reason,
            gender: this.state.selectedGender ? this.state.selectedGender.value : '',
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.lang,
            date: dateBooking,
            dateString: dateBookingString,
            doctorName: doctorName,
            addressClinic: resClinic.data && resClinic.data.clinicData ? resClinic.data.clinicData.address : '',
            nameClinic: resClinic.data && resClinic.data.clinicData ? resClinic.data.clinicData.name : '',
        })
        // console.log("check state", this.state)
        if (res && res.errCode === 0) {
            toast.success("Making an appointment successfully!");
            this.toggle();
            this.props.isLoadingAppRedux(false)
        } else {
            toast.error(`${res.message}`);
            this.props.isLoadingAppRedux(false)
        }
    }


    // create new booking bookingScheduleData.timeType bookingScheduleData.date bookingScheduleData.doctorId
    render() {
        let { isOpenModal, bookingScheduleData } = this.props;
        // console.log("check bookingScheduleData", bookingScheduleData)
        let doctorId = bookingScheduleData && !_.isEmpty(bookingScheduleData) ? bookingScheduleData.doctorId : '';
        // console.log('check props gender build data input', this.buildDataInputSelect(this.props.genderRedux))
        // console.log('check props gender', this.props.genderRedux)
        // console.log("check booking modal", bookingScheduleData)
        return (

            <Modal isOpen={isOpenModal}
                // toggle={() => { this.toggle() }}
                className='booking-modal-container'
                size='lg'
                centered
            >
                {/* <ModalHeader toggle={() => { this.toggle() }}>BookingModal</ModalHeader> */}

                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'> <FormattedMessage id="client.booking-modal.appointment-info" /> </span>
                        <span onClick={() => { this.toggle() }} className='right'> <i className='fas fa-times'></i> </span>
                    </div>
                    <div className='booking-modal-body container'>
                        {/* <div>{JSON.stringify(bookingScheduleData)}</div> */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                // isShowDescription={false}
                                bookingScheduleData={this.props.bookingScheduleData}
                                isShowPrice={false}
                            />
                        </div>

                        <div className='payment-info'>

                        </div>
                        <div className='row'>
                            <div className="col-6 form-group">
                                <label className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.fullName" /></label>
                                <input type="text" className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "fullName")}
                                    // placeholder="Họ tên"
                                    value={this.state.fullName}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.email" /></label>
                                <input type="text" className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "email")}
                                    // placeholder="Email"
                                    value={this.state.email}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.phone-number" /></label>
                                <input type="text" className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                                    // placeholder="Phone number"
                                    value={this.state.phoneNumber}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label for="inputEmail" className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.address" /></label>
                                <input type="text" className='form-control'
                                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                                    // placeholder="Address"
                                    value={this.state.address}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label for="inputEmail" className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                    placeholder={"Please select!"}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label for="inputGender" className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label for="inputEmail" className="mb-1 mt-2"><FormattedMessage id="client.booking-modal.reason" /></label>
                                <textarea type="text" className='form-control' rows={3}
                                    onChange={(event) => this.handleOnChangeInput(event, "reason")}
                                    // placeholder="reason"
                                    value={this.state.reason}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='booking-modal-footer'>
                        <button
                            onClick={() => { this.handleBookingAnAppointment() }} className='btn btn-warning text-white'>
                            <FormattedMessage id="client.booking-modal.btn-confirm" />
                        </button>
                        <button
                            onClick={() => { this.toggle() }} className='btn btn-danger'>
                            <FormattedMessage id="client.booking-modal.btn-cancel" />
                        </button>
                    </div>
                </div>
            </Modal >
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        isLoadingAppRedux: (isLoading) => dispatch(actions.isLoadingApp(isLoading))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
