import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES, USER_ROLE, dateFormat } from '../../../utils';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveScheduleInfoService } from '../../../services/userService';

class SystemDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listAllDoctors: '',
            selectedDoctor: '',
            selectedDate: new Date(),
            listAllScheduleTime: '',
        }
    }

    componentDidMount() {
        // load 
        this.props.loadAllDoctor();
        this.props.loadAllScheduleTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.lang;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            this.setState({
                // call buildDataInputSelect function to set options for Doctor dropdown 
                listAllDoctors: this.buildDataInputSelect(this.props.allDoctorRedux)
            })
        }

        if (prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux) {
            let data = this.props.allScheduleTimeRedux;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            // console.log("check data isSelected: ", data)
            this.setState({
                listAllScheduleTime: data
            })
        }


        // if (prevProps.lang !== this.props.lang) {
        //     this.setState({
        //         // call buildDataInputSelect function to set options for Doctor dropdown 
        //         listAllDoctors: this.buildDataInputSelect(this.props.allDoctorRedux)
        //     })
        // }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );

    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            selectedDate: date[0]
        })
    }

    handleClickChooseTime = (time) => {
        // console.log('drkhaik check item', time)
        // click button time 
        let { listAllScheduleTime } = this.state;
        if (listAllScheduleTime && listAllScheduleTime.length > 0) {
            listAllScheduleTime = listAllScheduleTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                listAllScheduleTime: listAllScheduleTime
            })
        }
    }

    handleSaveScheduleInfo = async () => {
        let { listAllScheduleTime, selectedDoctor, selectedDate } = this.state;
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid Doctor!");
            return;
        }
        if (!selectedDate) {
            toast.error("Invalid date!");
            return;
        }
        // formatted date send to db
        // let formattedDate = moment(selectedDate).format(dateFormat.SEND_TO_SERVER);
        let formattedDate = new Date(selectedDate).setHours(0, 0, 0, 0);

        let result = [];
        if (listAllScheduleTime && listAllScheduleTime.length > 0) {
            // use filter function to create a new array with the condition required
            let selectedScheduleTime = listAllScheduleTime.filter(item => item.isSelected === true);
            // console.log("check selected schedule time: ", selectedScheduleTime);
            if (selectedScheduleTime && selectedScheduleTime.length > 0) {
                selectedScheduleTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Invalid time!");
                return;
            }
        }
        // console.log('drkhaik check result', result)

        let res = await saveScheduleInfoService({
            // send data to compare to Back end Node JS
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formattedDate,
        })

        if (res && res.errCode === 0) {
            toast.success("Save ScheduleInfoService successfully!");
        } else {
            toast.error("saveScheduleInfoService Error!");
            console.log("saveScheduleInfoService Error >>> res", res)
        }
    }

    render() {
        // console.log("hoi dan it check state ", this.state)
        let { userInfo } = this.props;
        // console.log("check props ", this.props)
        let { listAllScheduleTime } = this.state;
        let language = this.props.lang;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (

            <div className='manage-schedule-container container'>
                <div className='manage-schedule-title text-uppercase text-center font-weight-bold my-4 h4'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            {/* {userInfo && !_.isEmpty(userInfo) && userInfo.roleId === USER_ROLE.ADMIN} */}
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listAllDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.selectedDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 choose-time-container py-3'>
                            <label className='col-12 font-weight-bold'> <FormattedMessage id="manage-schedule.choose-time" /></label>
                            {listAllScheduleTime && listAllScheduleTime.length > 0 &&
                                listAllScheduleTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-choose-time active' : 'btn btn-choose-time'}
                                            key={index} value={item.keyMap}
                                            onClick={() => this.handleClickChooseTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <button className='btn btn-primary btn-outline-light border-dark my-3'
                            onClick={() => this.handleSaveScheduleInfo()}
                        >
                            <FormattedMessage id="manage-schedule.save-info" />
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // nhan gtri sau khi fire event loadAllDoctor
        allDoctorRedux: state.admin.allDoctor,
        lang: state.app.language,
        userInfo: state.user.userInfo,
        allScheduleTimeRedux: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllDoctor: () => dispatch(actions.getAllDoctor()),
        loadAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemDoctor);
