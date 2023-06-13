import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import Select from 'react-select';
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientForDoctor, saveCompletedStatusService } from "../../../services/userService";
import moment from 'moment';
import { toast } from 'react-toastify';


class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            arrPatientData: []
        }
    }

    async componentDidMount() {
        this.getPatientData();
    }

    getPatientData = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        // new Date(this.state.birthday).setHours(0, 0, 0, 0);
        let formattedDate = new Date(currentDate).getTime();
        // console.log("check formatted Date", formattedDate, currentDate);
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                arrPatientData: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getPatientData();
        })
    }

    handleDoneButton = async (item) => {
        let data = {
            patientId: item.patientId,
            date: item.date,
            timeType: item.timeType
        }
        let res = await saveCompletedStatusService(data);
        if (res && res.errCode === 0) {
            toast.success(`${res.message}`);
            await this.getPatientData()
        } else {
            toast.error(`${res.message}`);
        }
        // console.log("check res", res)
        // console.log("check item", item)
    }

    render() {
        // console.log("check props", this.props)
        console.log("check state", this.state)
        let { arrPatientData } = this.state;
        let language = this.props.lang;
        return (
            <div className='manage-patient-container container'>
                <div className='title'>Manage Patient</div>
                <div className='manage-patient-body row'>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        // minDate={yesterday}
                        />
                    </div>
                    <div className='manage-patient-table col-12'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Full name</th>
                                    <th>Gender</th>
                                    <th>Birthday</th>
                                    <th>Reason</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                {arrPatientData && arrPatientData.length > 0 ?
                                    arrPatientData.map((item, index) => {
                                        let gender = language === LANGUAGES.VI ? item.patientData.genderPatient.valueVi : item.patientData.genderPatient.valueEn;
                                        let time = language === LANGUAGES.VI ? item.timeTypeBooking.valueVi : item.timeTypeBooking.valueEn;
                                        // R2 or R3
                                        let status = language === LANGUAGES.VI ? item.statusData.valueVi : item.statusData.valueEn;
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.patientData.fullName}</td>
                                                <td>{gender}</td>
                                                <td>{item.patientData.birthday}</td>
                                                <td>{item.patientData.reason}</td>
                                                <td>{time}</td>
                                                <td> <span className='badge badge-primary'>{status}</span></td>
                                                <td>
                                                    <button
                                                        className="btn btn-done"
                                                        onClick={() => this.handleDoneButton(item)}> Done
                                                    </button>
                                                    {/* <button
                                                        className="btn btn-delete"
                                                        onClick={() => this.handleDeleteUser(item)}>Cancel
                                                    </button> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={8} className='text-center font-weight-bold'> No data! </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
