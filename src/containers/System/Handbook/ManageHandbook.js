import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageHandbook.scss';
import MarkdownIt from 'markdown-it'; // npm install --save markdown-it@12.1.0  // dependencies
import MdEditor from 'react-markdown-editor-lite'; // npm install --save react-markdown-editor-lite@1.3.0
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createNewHandbookService, getAllHandbookService } from '../../../services/userService';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImgURL: '',

            handbookId: '',
            nameHandbook: '',
            description: '',
            contentMarkdown: '',
            contentHTML: '',
            image: '',

            action: CRUD_ACTIONS.CREATE,
            arrHandbook: []
        }
    }

    async componentDidMount() {
        // this.props.loadAllHandbook();
        await this.getAllHandbook()
    }

    getAllHandbook = async () => {
        let res = await getAllHandbookService();
        // console.log("check res", res)
        if (res && res.errCode === 0) {
            this.setState({
                arrHandbook: res.data ? res.data : []
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // this didUpdate is running only when prevProp and thisProp has change, prop to another component and it will run.
        if (prevProps.allHandbookDataRedux !== this.props.allHandbookDataRedux) {
            this.setState({
                // arrHandbook: this.props.allHandbookDataRedux,
            })
        }
        if (prevProps.lang !== this.props.lang) {

        }

    }
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
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

    handleEditHandbook = (handbook) => {
        console.log('check handle edit from parent', handbook)
        this.setState({
            handbookId: handbook.id,
            nameHandbook: handbook.name,
            description: handbook.description,
            image: '',
            contentMarkdown: handbook.contentMarkdown,
            contentHTML: handbook.contentHTML,
            previewImgURL: handbook.image,
            action: CRUD_ACTIONS.EDIT
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['nameHandbook', 'description', 'contentHTML', 'contentMarkdown'];
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

    // handleDeleteSpecialty = async (specialty) => {
    //     // console.log("check item", specialty)
    //     let res = await deleteHandbookByIdService(specialty.id);
    //     if (res && res.errCode === 0) {
    //         toast.success('Delete Handbook successful!');
    //     } else {
    //         toast.error('Something went wrong...!');
    //         console.log("check res error: ", res)
    //     }
    // }

    handleSaveNewHandbook = async () => {
        // create or update
        let isValid = this.checkValidateInput();
        if (isValid === false) { return; }
        let { action } = this.state;
        let res = '';
        if (action === CRUD_ACTIONS.CREATE) {
            res = await createNewHandbookService({
                nameHandbook: this.state.nameHandbook,
                description: this.state.description,
                image: this.state.image,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                action: action
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire action edit
            res = await createNewHandbookService({
                handbookId: this.state.handbookId,
                nameHandbook: this.state.nameHandbook,
                description: this.state.description,
                image: this.state.image,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                action: action
            })
        }

        // console.log("check state 1", this.state)

        if (res && res.errCode === 0) {
            toast.success('Add new Handbook successful!');
            this.setState({
                previewImgURL: '',

                nameHandbook: '',
                description: '',
                image: '',
                contentMarkdown: '',
                contentHTML: '',

                action: CRUD_ACTIONS.CREATE,
            })
        } else {
            toast.error('Something went wrong...!');
            console.log("check res error: ", res)
        }
    }

    render() {
        console.log("check state ", this.state)
        let { arrHandbook } = this.state;
        return (
            <div className='manage-specialty-container container'>
                <div className='title mb-3'><FormattedMessage id="admin.manage-handbook.manage-handbook" /></div>
                <div className='manage-specialty-body row'>
                    <div className='col-12 form-group'>
                        <label><FormattedMessage id="admin.manage-handbook.name-handbook" /></label>
                        <input className='form-control' type='text'
                            onChange={(event) => { this.handleOnChangeText(event, 'nameHandbook') }}
                            value={this.state.nameHandbook}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-handbook.description" /></label>
                        <textarea className='form-control' rows={3}
                            onChange={(event) => { this.handleOnChangeText(event, 'description') }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                    <div className='col-6 form-group'>
                        <div className='preview-img-container'>
                            <input type="file" id='previewImg' hidden
                                onChange={(event) => { this.handleOnChangeImage(event) }}
                            />
                            <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="admin.manage-handbook.upload-image" /> <i className="fas fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>

                    <div className='manage-doctor-editor col-12 mt-3'>
                        <label className=''><FormattedMessage id="admin.manage-handbook.content-handbook" /></label>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning mb-3 mt-3" : "btn btn-primary mb-3 mt-3"}
                            onClick={() => { this.handleSaveNewHandbook() }}>
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
                                <th className='col-8 text-center'>Name</th>
                                {/* <th className='col-4 text-center'>Address</th> */}
                                <th className='col-4 text-center'>Action</th>
                            </tr>
                            {arrHandbook && arrHandbook.length > 0 && arrHandbook.map((item, index) => {
                                return (
                                    <tr key={index} className='row'>
                                        <td className='col-8 text-center'>{item.name}</td>
                                        {/* <td className='col-4 text-center'>{item.address}</td> */}
                                        <td className='col-4 text-center'>
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => this.handleEditHandbook(item)}  ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className="btn btn-delete" disabled
                                            ><i className="fas fa-trash"></i>
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
        // allHandbookDataRedux: state.admin.allHandbookData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadAllHandbook: () => dispatch(actions.fetchAllHandbook()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
