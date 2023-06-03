import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
// import "./ManageDoctor.scss";
import MarkdownIt from 'markdown-it'; // npm install --save markdown-it@12.1.0  // dependencies
import MdEditor from 'react-markdown-editor-lite'; // npm install --save react-markdown-editor-lite@1.3.0
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailSectionDoctorService, getExtraInfoDoctorByIdService } from '../../../services/userService';
import _ from 'lodash';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    /** Life cycle  
    * Run component:
    * 1. Run construct -> init state
    * 2. Did mount (set state)
    * 3. Render
    */
    constructor(props) {
        super(props);
        this.state = {
            // save to detail section, doctor or clinic or specialty
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listAllDoctors: [],
            hasOldData: false,


            // save to Doctor info
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',

        }
    }

    componentDidMount() {
        // load 
        this.props.loadAllDoctor();
        this.props.loadAllRequiredDoctorInfo();
    }
    // handle modify data input select to name and id
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;
        if (inputData && inputData.length > 0) {
            if (type === `USERS`) {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === `PRICE`) {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === `PAYMENT` || type === `PROVINCE`) {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === `SPECIALTY`) {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }


        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            this.setState({
                // call buildDataInputSelect function to set options for Doctor dropdown 
                listAllDoctors: this.buildDataInputSelect(this.props.allDoctorRedux, 'USERS')
            })
        }

        if (prevProps.allRequiredDoctorInfoRedux !== this.props.allRequiredDoctorInfoRedux) {
            // console.log("get data from all required doctor info redux", this.props.allRequiredDoctorInfoRedux)
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfoRedux;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            // console.log("log data select", dataSelectPayment, dataSelectPrice, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            })
        }


        if (prevProps.lang !== this.props.lang) {
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfoRedux;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            this.setState({
                // call buildDataInputSelect function to set options for Doctor dropdown 
                listAllDoctors: this.buildDataInputSelect(this.props.allDoctorRedux, 'USERS'),
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            })
        }
    }

    // Finish! // () => {}
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    // cach su dung 1 function cho nhieu input lay value
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value; // description = {.....text}
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = selectedOption; // selectedPrice = {label: 10, value: PRI1}
        this.setState({
            ...stateCopy
        })
        // console.log('hoi dan it channel check new select on change', selectedOption, name)
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
        let res = await getDetailSectionDoctorService(selectedDoctor.value);
        // console.log('check res', res)
        if (res && res.errCode === 0 && res.data) {
            this.setState({
                contentHTML: res.data.contentHTML,
                contentMarkdown: res.data.contentMarkdown,
                description: res.data.description,
                hasOldData: true,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
        let { listPayment, listPrice, listProvince, listSpecialty } = this.state;
        let res2 = await getExtraInfoDoctorByIdService(selectedDoctor.value);
        console.log("check res2", res2)
        if (res2 && res2.errCode === 0 && !_.isEmpty(res2.data)) {
            // object.value = item.keyMap; use find function 
            let selectedPrice = listPrice.find(item => {
                return item && item.value === res2.data.priceId; // PRI3 === PRI3
            })
            let selectedPayment = listPayment.find(item => {
                return item && item.value === res2.data.paymentId;
            })
            let selectedProvince = listProvince.find(item => {
                return item && item.value === res2.data.provinceId;
            })
            let selectedSpecialty = listSpecialty.find(item => {  // object.value ~ item.value = item.id ~ res.data.specialtyId ;
                return item && +item.value === res2.data.specialtyId;
            })
            console.log("check selectedSpecialty ", selectedSpecialty, selectedProvince);
            // return
            this.setState({
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                nameClinic: res2.data.nameClinic,
                addressClinic: res2.data.addressClinic,
                note: res2.data.note,
                selectedSpecialty: selectedSpecialty,

            })
        } else {
            this.setState({
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedSpecialty: ''
            })
        }
    };

    handleSaveContentMarkdown = () => {
        console.log('hoi dan it check state: ', this.state)
        let { hasOldData } = this.state;
        this.props.saveInformationOfDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            actions: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice ? this.state.selectedPrice.value : '',
            selectedPayment: this.state.selectedPayment ? this.state.selectedPayment.value : '',
            selectedProvince: this.state.selectedProvince ? this.state.selectedProvince.value : '',
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty ? this.state.selectedSpecialty.value : '',
            clinicId: this.state.selectedClinic ? this.state.selectedClinic.value : ''
        });
    }

    render() {
        // selectedPrice: '',
        // selectedPayment: '',
        // selectedProvince: '',
        // let listAllDoctorRender = this.state.listAllDoctors;
        // console.log('check list all doctor: ', this.state.listAllDoctors);
        // console.log("check state", this.state)   
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container container'>
                <div className='title mb-5'> <FormattedMessage id="admin.manage-doctor.title" /> </div>
                <div className='doctor-detail row'>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listAllDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='form-group col-8'>
                        <label><FormattedMessage id="admin.manage-doctor.short-introduction" /></label>
                        <textarea className='form-control' rows={5}
                            onChange={(event) => { this.handleOnChangeText(event, 'description') }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='doctor-info row'>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            name="selectedPrice"
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            name="selectedPayment"
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            name="selectedProvince"
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        />
                    </div>

                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => { this.handleOnChangeText(event, 'nameClinic') }}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                        <input className='form-control'
                            onChange={(event) => { this.handleOnChangeText(event, 'addressClinic') }}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <textarea className='form-control' rows={3}
                            onChange={(event) => { this.handleOnChangeText(event, 'note') }}
                            value={this.state.note}
                        >
                        </textarea>
                    </div>
                    <div className='form-group col-6'>
                        <label><FormattedMessage id="admin.manage-doctor.specialtyId" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            name="selectedSpecialty"
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialtyId" />}
                        />
                    </div>
                    <div className='form-group col-6'>
                        <label><FormattedMessage id="admin.manage-doctor.clinicId" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleOnChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            name="selectedClinic"
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinicId" />}
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? 'btn btn-warning btn-outline-light border-light text-dark my-3'
                        : 'btn btn-success btn-outline-light border-dark my-3'}
                    onClick={() => this.handleSaveContentMarkdown()}
                > {hasOldData === true ? <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                    : <span><FormattedMessage id="admin.manage-doctor.add" /></span>} </button>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctorRedux: state.admin.allDoctor,
        lang: state.app.language,
        allRequiredDoctorInfoRedux: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllDoctor: () => dispatch(actions.getAllDoctor()),
        loadAllRequiredDoctorInfo: () => dispatch(actions.fetchDoctorRequiredInfo()),
        saveInformationOfDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
