import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it'; // npm install --save markdown-it@12.1.0  // dependencies
import MdEditor from 'react-markdown-editor-lite'; // npm install --save react-markdown-editor-lite@1.3.0
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewSpecialtyService, getAllSpecialtyService, deleteSpecialtyByIdService } from '../../../services/userService';
import { toast } from 'react-toastify';
// import { Editor } from '@tinymce/tinymce-react'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImgURL: '',

            specialtyId: '',
            nameSpecialty: '',
            image: '',
            descriptionMarkdown: '',
            descriptionHTML: '',

            action: CRUD_ACTIONS.CREATE,
            arrSpecialty: []
        }
    }

    async componentDidMount() {
        await this.getAllSpecialty()
    }

    getAllSpecialty = async () => {
        let res = await getAllSpecialtyService();
        // console.log("check res", res)
        if (res && res.errCode === 0) {
            this.setState({
                arrSpecialty: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (this.state.arrSpecialty !== prevState.arrSpecialty) {
            await this.getAllSpecialty();
        }


    }
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
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

    handleEditSpecialty = (specialty) => {
        // console.log('hoidanit check handle edit user from parent', specialty)
        // let imageBase64 = '';
        // if (user.image) {
        //     // decode... convert base64 ra image khi click vao edit
        //     imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        // }
        this.setState({
            specialtyId: specialty.id,
            nameSpecialty: specialty.name,
            image: '',
            descriptionMarkdown: specialty.descriptionMarkdown,
            descriptionHTML: specialty.descriptionHTML,
            previewImgURL: specialty.image,
            action: CRUD_ACTIONS.EDIT
        })
        // console.log("check state", this.state)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['nameSpecialty', 'descriptionMarkdown', 'descriptionHTML'];
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
        console.log("check item", specialty)
        let res = await deleteSpecialtyByIdService(specialty.id);
        if (res && res.errCode === 0) {
            toast.success('Delete Specialty successful!');
        } else {
            toast.error('Something went wrong...!');
            console.log("check res error: ", res)
        }
    }

    handleSaveNewSpecialty = async () => {
        // create or update
        let isValid = this.checkValidateInput();
        if (isValid === false) { return; }
        let { action } = this.state;
        let res = '';
        if (action === CRUD_ACTIONS.CREATE) {
            res = await createNewSpecialtyService({
                nameSpecialty: this.state.nameSpecialty,
                image: this.state.image,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
                action: action
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire action edit
            res = await createNewSpecialtyService({
                specialtyId: this.state.specialtyId,
                nameSpecialty: this.state.nameSpecialty,
                image: this.state.image,
                descriptionMarkdown: this.state.descriptionMarkdown,
                descriptionHTML: this.state.descriptionHTML,
                action: action
            })
        }

        console.log("check state", this.state)

        if (res && res.errCode === 0) {
            toast.success('Add new Specialty successful!');
            this.setState({
                previewImgURL: '',

                nameSpecialty: '',
                image: '',
                descriptionMarkdown: '',
                descriptionHTML: '',

                action: CRUD_ACTIONS.CREATE,
            })
        } else {
            toast.error('Something went wrong...!');
            console.log("check res error: ", res)
        }
    }

    render() {
        // console.log("check state ", this.state)
        let { arrSpecialty } = this.state;
        return (
            <div className='manage-specialty-container container'>
                <div className='title mb-3'><FormattedMessage id="admin.manage-specialty.manage-specialty" /></div>
                <div className='manage-specialty-body row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-specialty.name-specialty" /></label>
                        <input className='form-control' type='text'
                            onChange={(event) => { this.handleOnChangeText(event, 'nameSpecialty') }}
                            value={this.state.nameSpecialty}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <div className='preview-img-container'>
                            <input type="file" id='previewImg' hidden onClick={() => console.log("File input!")}
                                onMouseDown={() => console.log("File input mousedown!")}
                                onChange={(event) => { this.handleOnChangeImage(event) }}
                            />
                            <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="admin.manage-specialty.upload-image" /> <i className="fas fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className='manage-doctor-editor col-12'>
                        <label><FormattedMessage id="admin.manage-specialty.desc-specialty" /></label>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning mb-3 mt-3" : "btn btn-primary mb-3 mt-3"}
                            onClick={() => { this.handleSaveNewSpecialty() }}>
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
                                <th className='col-9 text-center'>Name</th>
                                <th className='col-3 text-center'>Action</th>
                            </tr>
                            {arrSpecialty && arrSpecialty.length > 0 && arrSpecialty.map((item, index) => {
                                return (
                                    <tr key={index} className='row'>
                                        <td className='col-9 text-center'>{item.name}</td>
                                        <td className='col-3 text-center'>
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => this.handleEditSpecialty(item)}  ><i className="fas fa-pencil-alt"></i></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
