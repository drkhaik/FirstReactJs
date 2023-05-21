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
import { getDetailSectionDoctorService } from '../../../services/userService';

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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listAllDoctors: '',
            hasOldData: false,
        }
    }

    componentDidMount() {
        // load 
        this.props.loadAllDoctor();
    }
    // handle modify data input select to name and id
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
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                // call buildDataInputSelect function to set options for Doctor dropdown 
                listAllDoctors: this.buildDataInputSelect(this.props.allDoctorRedux)
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

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
        let res = await getDetailSectionDoctorService(selectedDoctor.value);
        console.log('check res', res)
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

    };

    handleSaveContentMarkdown = () => {
        // console.log('hoi dan it check state: ', this.state)
        let { hasOldData } = this.state;
        this.props.saveInformationOfDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            actions: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    }

    render() {
        // let listAllDoctorRender = this.state.listAllDoctors;
        // console.log('check list all doctor: ', this.state.listAllDoctors);
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container mx-2'>
                <div className='manage-doctor-title text-center h2 font-weight-bold my-3 '>Hello doctor</div>
                <div className='more-info row'>
                    <div className='form-group col-4'>
                        <label>Chọn Bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listAllDoctors}
                        />
                    </div>
                    <div className='form-group col-8'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows={5}
                            onChange={(event) => { this.handleOnChangeDescription(event) }}
                            // set value = state description
                            value={this.state.description}>
                        </textarea>
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
                    className={hasOldData === true ? 'btn btn-warning btn-outline-light border-light my-3'
                        : 'btn btn-success btn-outline-light border-dark my-3'}
                    onClick={() => this.handleSaveContentMarkdown()}
                > {hasOldData === true ? <span>Lưu thông tin</span> : <span>Thêm thông tin</span>} </button>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctorRedux: state.admin.allDoctor,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllDoctor: () => dispatch(actions.getAllDoctor()),
        saveInformationOfDoctor: (data) => dispatch(actions.saveInfoDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
