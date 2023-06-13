import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it'; // npm install --save markdown-it@12.1.0  // dependencies
import MdEditor from 'react-markdown-editor-lite'; // npm install --save react-markdown-editor-lite@1.3.0
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewClinicService, deleteClinicByIdService } from '../../../services/userService';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImgURL: '',

            clinicId: '',
            nameClinic: '',
            address: '',
            note: '',
            backgroundImage: '',
            image: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            strength_equipmentMarkdown: '',
            strength_equipmentHTML: '',

            action: CRUD_ACTIONS.CREATE,
            arrClinic: []
        }
    }

    componentDidMount() {
        this.props.loadAllClinic();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this didUpdate is running only when prevProp and thisProp has change, prop to another component and it will run.
        if (prevProps.allClinicDataRedux !== this.props.allClinicDataRedux) {
            // console.log("check running or not?", this.props.allClinicDataRedux)
            this.setState({
                arrClinic: this.props.allClinicDataRedux,
            })
        }
        if (prevProps.lang !== this.props.lang) {
            console.log("abc")
        }

    }
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleStrengthEquipmentEditorChange = ({ html, text }) => {
        // console.log('handleStrengthEquipmentEditorChange', html, text);
        this.setState({
            strength_equipmentHTML: html,
            strength_equipmentMarkdown: text,
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value; // description = {.....text}
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            // convert anh sang base64 luu vao db
            let base64 = await CommonUtils.getBase64(file);
            // console.log('check base 64: ', base64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }

    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleEditClinic = (clinic) => {
        console.log('check handle edit from parent', clinic)
        // let imageBase64 = '';
        // if (user.image) {
        //     // decode... convert base64 ra image khi click vao edit
        //     imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        // }
        this.setState({
            clinicId: clinic.id,
            nameClinic: clinic.name,
            address: clinic.address,
            note: clinic.note ? clinic.note : '',
            backgroundImage: clinic.backgroundImage ? clinic.backgroundImage : '',
            image: '',
            descriptionMarkdown: clinic.descriptionMarkdown,
            descriptionHTML: clinic.descriptionHTML,
            strength_equipmentMarkdown: clinic.strength_equipmentMarkdown,
            strength_equipmentHTML: clinic.strength_equipmentHTML,
            previewImgURL: clinic.image,
            action: CRUD_ACTIONS.EDIT
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['nameClinic', 'address', 'descriptionMarkdown', 'descriptionHTML', 'strength_equipmentMarkdown',
            'strength_equipmentHTML', 'note', 'backgroundImage'];
        for (let i = 0; i < arrInput.length; i++) {
            // console.log("check inside loop", this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
            // handle gender and role option
        }
        return isValid;
    }

    handleDeleteSpecialty = async (specialty) => {
        // console.log("check item", specialty)
        let res = await deleteClinicByIdService(specialty.id);
        if (res && res.errCode === 0) {
            toast.success('Delete Clinic successful!');
        } else {
            toast.error('Something went wrong...!');
            console.log("check res error: ", res)
        }
    }

    handleSaveNewClinic = async () => {
        // create or update
        let isValid = this.checkValidateInput();
        if (isValid === false) { return; }
        let { action } = this.state;
        let res = '';
        if (action === CRUD_ACTIONS.CREATE) {
            res = await createNewClinicService({
                nameClinic: this.state.nameClinic,
                address: this.state.address,
                note: this.state.note,
                backgroundImage: this.state.backgroundImage,
                image: this.state.image,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
                strength_equipmentMarkdown: this.state.strength_equipmentMarkdown,
                strength_equipmentHTML: this.state.strength_equipmentHTML,
                action: action
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire action edit
            res = await createNewClinicService({
                clinicId: this.state.clinicId,
                nameClinic: this.state.nameClinic,
                address: this.state.address,
                note: this.state.note,
                backgroundImage: this.state.backgroundImage,
                image: this.state.image,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
                strength_equipmentMarkdown: this.state.strength_equipmentMarkdown,
                strength_equipmentHTML: this.state.strength_equipmentHTML,
                action: action
            })
        }

        // console.log("check state 1", this.state)

        if (res && res.errCode === 0) {
            toast.success('Add new Clinic successful!');
            this.setState({
                previewImgURL: '',

                nameClinic: '',
                address: '',
                note: '',
                backgroundImage: '',
                image: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                strength_equipmentMarkdown: '',
                strength_equipmentHTML: '',

                action: CRUD_ACTIONS.CREATE,
            })
        } else {
            toast.error('Something went wrong...!');
            console.log("check res error: ", res)
        }

        // console.log("check state 2", this.state)
    }

    render() {
        console.log("check state ", this.state)
        let { arrClinic } = this.state;
        return (
            <div className='manage-specialty-container container'>
                <div className='title mb-3'><FormattedMessage id="admin.manage-clinic.manage-clinic" /></div>
                <div className='manage-specialty-body row'>
                    <div className='col-12 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.name-clinic" /></label>
                        <input className='form-control' type='text'
                            onChange={(event) => { this.handleOnChangeText(event, 'nameClinic') }}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.address" /></label>
                        {/* <input className='form-control' type='text'
                            onChange={(event) => { this.handleOnChangeText(event, 'address') }}
                            value={this.state.address}
                        /> */}
                        <textarea className='form-control' rows={2}
                            onChange={(event) => { this.handleOnChangeText(event, 'address') }}
                            value={this.state.address}
                        >
                        </textarea>
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.backgroundImage" /></label>
                        <input className='form-control' type='text'
                            onChange={(event) => { this.handleOnChangeText(event, 'backgroundImage') }}
                            value={this.state.backgroundImage}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-clinic.note" /></label>
                        <textarea className='form-control' rows={4}
                            onChange={(event) => { this.handleOnChangeText(event, 'note') }}
                            value={this.state.note}
                        >
                        </textarea>
                    </div>

                    <div className='col-2 form-group'>
                        <div className='preview-img-container'>
                            <input type="file" id='previewImg' hidden
                                onChange={(event) => { this.handleOnChangeImage(event) }}
                            />
                            <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="admin.manage-clinic.upload-image" /> <i className="fas fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className='manage-doctor-editor col-12'>
                        <label><FormattedMessage id="admin.manage-clinic.desc-clinic" /></label>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='manage-doctor-editor col-12 mt-3'>
                        <label className=''><FormattedMessage id="admin.manage-clinic.strength-equipment-clinic" /></label>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleStrengthEquipmentEditorChange}
                            value={this.state.strength_equipmentMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning mb-3 mt-3" : "btn btn-primary mb-3 mt-3"}
                            onClick={() => { this.handleSaveNewClinic() }}>
                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                <FormattedMessage id="admin.manage-user.edit" />
                                : <FormattedMessage id="admin.manage-user.save" />}

                        </button>
                    </div>
                </div>

                <React.Fragment>
                    <table id="table-specialty">
                        <tbody>
                            <tr className='row'>
                                <th className='col-4 text-center'>Name</th>
                                <th className='col-4 text-center'>Address</th>
                                <th className='col-4 text-center'>Action</th>
                            </tr>
                            {arrClinic && arrClinic.length > 0 && arrClinic.map((item, index) => {
                                return (
                                    <tr key={index} className='row'>
                                        <td className='col-4 text-center'>{item.name}</td>
                                        <td className='col-4 text-center'>{item.address}</td>
                                        <td className='col-4 text-center'>
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => this.handleEditClinic(item)}  ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className="btn btn-delete" disabled
                                                onClick={() => this.handleDeleteSpecialty(item)}><i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                </React.Fragment>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allClinicDataRedux: state.admin.allClinicData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllClinic: () => dispatch(actions.fetchAllClinic()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
