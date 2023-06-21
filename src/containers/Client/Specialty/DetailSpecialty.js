import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import Select from 'react-select';
import { getDetailSpecialtyByIdService, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            selectedProvince: ''
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;
            let res = await getDetailSpecialtyByIdService({
                id: specialtyId,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE');

            console.log("check res", res)
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arrDoctorSpecialty = data.doctorSpecialty;
                    if (arrDoctorSpecialty && arrDoctorSpecialty.length > 0) {
                        arrDoctorSpecialty.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc",

                    })
                }
                // console.log("check res province", resProvince.data)
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

    }

    handleOnChangeSelectProvince = async (event) => {
        // console.log("check on change select", event.target.value);
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let specialtyId = this.props.match.params.id;
            let selectedProvince = event.target.value;

            let res = await getDetailSpecialtyByIdService({
                id: specialtyId,
                location: selectedProvince
            })
            // console.log("check location data specialty", selectedProvince)
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arrDoctorSpecialty = data.doctorSpecialty;
                    if (arrDoctorSpecialty && arrDoctorSpecialty.length > 0) {
                        arrDoctorSpecialty.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        console.log("check state: ", this.state);
        let language = this.props.lang;
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-body'>
                        <div className='description-specialty-wrapper'
                            style={{ backgroundImage: `url(${dataDetailSpecialty.image ? dataDetailSpecialty.image : ''})` }}
                        >
                            <div className='description-specialty'>
                                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                    <>
                                        <div className='name-specialty'> {dataDetailSpecialty.name}</div>
                                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='doctor-info-wrapper'>
                            <div className='doctor-info-container row'>
                                <div className="col-2 form-group mt-3">
                                    {/* <label><FormattedMessage id="admin.manage-doctor.province" /></label> */}
                                    <select className='select-province' onChange={(event) => this.handleOnChangeSelectProvince(event)}>
                                        {listProvince && listProvince.length > 0
                                            && listProvince.map((item, index) => {
                                                return (
                                                    <option value={item.keyMap} key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>

                                {arrDoctorId && arrDoctorId.length > 0 &&
                                    arrDoctorId.map((item, index) => {
                                        return (
                                            <div className='doctor-info col-12'>
                                                <div className='detail-content-left'>
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        // isShowDescription={false}
                                                        // bookingScheduleData={this.props.bookingScheduleData}
                                                        isShowPrice={false}
                                                        isShowLocation={true}
                                                    />
                                                </div>
                                                <div className='detail-content-right'>
                                                    <div className='doctor-schedule'>
                                                        <DoctorSchedule
                                                            doctorIdFromParent={item}
                                                            key={index}
                                                        />
                                                    </div>
                                                    <div className='doctor-extra-info'>
                                                        <DoctorExtraInfo
                                                            doctorIdFromParent={item}
                                                            key={index}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
