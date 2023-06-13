import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import Select from 'react-select';
import { getDetailClinicByIdService, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
// import { useEffect } from 'react';


class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            scrollTop: 0,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let clinicId = this.props.match.params.id;
            let res = await getDetailClinicByIdService({
                id: clinicId
            })

            // console.log("check res", res)

            if (res && res.errCode === 0) {
                // let data = res.data;
                let arrDoctorId = [];
                if (res.data && !_.isEmpty(res.data)) {
                    let arrDoctorOfClinic = res.data.doctorOfClinic;
                    if (arrDoctorOfClinic && arrDoctorOfClinic.length > 0) {
                        arrDoctorOfClinic.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
    }

    handleClick = (targetId) => {
        let targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });

        }
    }


    handleOnScroll = () => {
        this.setState({
            scrollTop: window.scrollY,
        })
        console.log("ok")
    }




    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        // console.log("check state: ", this.state);
        let language = this.props.lang;
        return (
            <>
                <div className='detail-clinic-container' onScroll={this.handleOnScroll}>
                    <HomeHeader />
                    {/* <div>{this.state.scrollTop}</div> */}
                    <div className='detail-clinic-body'>
                        <div className='background-clinic'>
                            <img src={`${dataDetailClinic.backgroundImage ? dataDetailClinic.backgroundImage : ''}`} />

                            {/* <div></div> */}
                        </div>
                        <div className='clinic-introduce-wrapper'>
                            <div className='clinic-badge-wrapper'>
                                <div className='clinic-badge'>
                                    <div className='left'>
                                        <img src={`${dataDetailClinic.image ? dataDetailClinic.image : ''}`} />
                                    </div>
                                    <div className='right'>
                                        <div className='clinic-name'>
                                            {dataDetailClinic && dataDetailClinic.name ? dataDetailClinic.name : ''}
                                        </div>
                                        <div className='clinic-address'>
                                            {dataDetailClinic && dataDetailClinic.address ? dataDetailClinic.address : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='menu'>
                            <ul className='menu-content'>
                                <li> <button onClick={() => this.handleClick('booking')}>Đặt lịch khám</button></li>
                                <li> <button onClick={() => this.handleClick('introduce')}> Giới thiệu</button></li>
                                <li> <button onClick={() => this.handleClick('strength_equipment')} >Thế mạnh chuyên môn và trang thiết bị </button></li>
                            </ul>
                        </div>
                        <div className='clinic-detail-info-wrapper'>
                            <div className='brief-introduce'>
                                <FormattedMessage id="client.detail-clinic.brief-introduce" />
                            </div>
                            <div className='note-clinic'>
                                {/* {dataDetailClinic && dataDetailClinic.note ? dataDetailClinic.note : ''} */}
                                <p><FormattedMessage id="client.detail-clinic.note-title-1" />
                                    <span> {dataDetailClinic && dataDetailClinic.name ? dataDetailClinic.name : ''} </span>
                                    <FormattedMessage id="client.detail-clinic.note-title-2" /> </p>
                                <ul >
                                    <li><FormattedMessage id="client.detail-clinic.note-content-1" /></li>
                                    <li><FormattedMessage id="client.detail-clinic.note-content-2" /> </li>
                                    <li><FormattedMessage id="client.detail-clinic.note-content-3" /></li>
                                    <li><FormattedMessage id="client.detail-clinic.note-content-4" /></li>
                                </ul>
                            </div>

                            <div id='booking' className='section booking-info-section'>
                                <div className='title-section'><h5>Đặt lịch khám</h5></div>
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
                            <div id='introduce' className='section clinic-description'>
                                <div className='title-section'><h5>Giới thiệu</h5></div>
                                <div className='content-section'>


                                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div id='strength_equipment' className='section clinic-strength-equipment'>
                                <div className='title-section'><h5>Thế mạnh chuyên môn và trang thiết bị</h5></div>
                                <div className='content-section'>

                                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.strength_equipmentHTML }}></div>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
