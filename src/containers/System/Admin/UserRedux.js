import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            // isOpen: false,

            userId: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
            image: '',

            action: '',

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.getAllUserRedux();

    }

    // goi api la bat dong bo, nen mot lan Mount la ko du, phai su dung did update de mount lai nhieu lan lay du lieu
    // cal Api is async, non-blocking, so once mount isn't enough, we have to use didUpdate to mount over and over to get Data
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let genderArrRedux = this.props.genderRedux;
            this.setState({
                genderArr: genderArrRedux,
                // set gtri mac dinh cho gender
                gender: genderArrRedux && genderArrRedux.length > 0 ? genderArrRedux[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let positionArrRedux = this.props.positionRedux;
            this.setState({
                positionArr: positionArrRedux,
                position: positionArrRedux && positionArrRedux.length > 0 ? positionArrRedux[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let roleArrRedux = this.props.roleRedux;
            this.setState({
                roleArr: roleArrRedux,
                role: roleArrRedux && roleArrRedux.length > 0 ? roleArrRedux[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            // reset state khi add new user
            let positionArrRedux = this.props.positionRedux;
            let genderArrRedux = this.props.genderRedux;
            let roleArrRedux = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: genderArrRedux && genderArrRedux.length > 0 ? genderArrRedux[0].keyMap : '',
                position: positionArrRedux && positionArrRedux.length > 0 ? positionArrRedux[0].keyMap : '',
                role: roleArrRedux && roleArrRedux.length > 0 ? roleArrRedux[0].keyMap : '',
                image: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
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

        console.log('hoidanIT check on Change img: ', file)
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
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

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) { return; }
        let { action } = this.state; // let action = this.state.action
        // console.log('check state: ', this.state)
        if (action === CRUD_ACTIONS.CREATE) {
            // fire action create
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
                token: this.props.userAccessToken
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire action edit
            this.props.editUserRedux({
                id: this.state.userId,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
            })
        }

    }

    handleOnChangeInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        // console.log('hoidanit check handle edit user from parent', user)
        let imageBase64 = '';
        if (user.image) {
            // decode... convert base64 ra image khi click vao edit
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            userId: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            image: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT
        })
        // console.log('hoidanit check state', this.state)
    }

    render() {
        // console.log('check array of gender: ', this.state.genderArr);
        // console.log('check language 2: ', LANGUAGES);
        console.log("check props ", this.props)
        let genderArrRender = this.state.genderArr;
        let roleArrRender = this.state.roleArr;
        let positionArrRender = this.state.positionArr;
        let language = this.props.lang;
        // console.log('check language: ', this.state);
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName, address, phoneNumber, gender, role, position, image } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux-React with Hoi Dan IT
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row form-container'>
                            <div className='col-12 my-3'><FormattedMessage id="admin.manage-user.add" /></div>
                            <div className='col-12'>{isLoadingGender === true ? "Loading gender" : ''}</div>
                            <div className="row col-12">
                                <div className="form-group col-6">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.email" /></label>
                                    <input type="email" className="form-control" placeholder="Email"
                                        value={email}
                                        onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT} />
                                </div>
                                <div className="form-group col-6">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.password" /></label>
                                    <input type="password" className="form-control" placeholder="Password"
                                        value={password}
                                        onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT} />
                                </div>
                            </div>
                            <div className="row col-12">
                                <div className="form-group col-6">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.firstName" /></label>
                                    <input type="text" className="form-control" placeholder="First name"
                                        value={firstName}
                                        onChange={(event) => { this.handleOnChangeInput(event, "firstName") }} />
                                </div>
                                <div className="form-group col-6">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.lastName" /></label>
                                    <input type="text" className="form-control" placeholder="Last name"
                                        value={lastName}
                                        onChange={(event) => { this.handleOnChangeInput(event, "lastName") }} />
                                </div>
                            </div>
                            <div className="row col-12">
                                <div className="form-group col-md-9">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.address" /></label>
                                    <input type="text" className="form-control" placeholder="1234 Main St"
                                        value={address}
                                        onChange={(event) => { this.handleOnChangeInput(event, "address") }} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.phoneNumber" /></label>
                                    <input type="text" className="form-control"
                                        value={phoneNumber}
                                        onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }} />
                                </div>
                            </div>
                            <div className="row col-12">
                                <div className="form-group col-md-3">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.gender" /></label>
                                    <select className="form-control" value={gender}
                                        onChange={(event) => { this.handleOnChangeInput(event, "gender") }} >
                                        {genderArrRender && genderArrRender.length > 0 &&
                                            genderArrRender.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.role" /></label>
                                    <select className="form-control" value={role}
                                        onChange={(event) => { this.handleOnChangeInput(event, "role") }}>
                                        {roleArrRender && roleArrRender.length > 0 &&
                                            roleArrRender.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.position" /></label>
                                    <select className="form-control" value={position}
                                        onChange={(event) => { this.handleOnChangeInput(event, "position") }}>
                                        {positionArrRender && positionArrRender.length > 0 &&
                                            positionArrRender.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="mb-1 mt-2"><FormattedMessage id="admin.manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input type="file" id='previewImg' hidden
                                            onChange={(event) => { this.handleOnChangeImage(event) }}
                                        />
                                        <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning mb-3 mt-3" : "btn btn-primary mb-3 mt-3"}
                            onClick={() => { this.handleSaveUser() }}>
                            {this.state.action === CRUD_ACTIONS.EDIT ?
                                <FormattedMessage id="admin.manage-user.edit" />
                                : <FormattedMessage id="admin.manage-user.save" />}

                        </button>
                        <TableManageUser
                            handleEditUserFromParent={this.handleEditUserFromParent}
                        />
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
        userInfo: state.user.userInfo,
        userAccessToken: state.user.userAccessToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        // getAllUserRedux: () => dispatch(actions.getAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
