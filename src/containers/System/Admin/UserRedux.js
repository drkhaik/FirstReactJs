import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeServices } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeServices('gender');
            // console.log('check all code of gender: ', res);
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        // console.log('check array of gender: ', this.state.genderArr);
        let gender = this.state.genderArr;
        let language = this.props.lang;
        console.log('check language: ', language);
        console.log('check language 2: ', LANGUAGES);
        return (
            <div className="user-redux-container">
                <div className="title">
                    User Redux-React with Hoi Dan IT
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='my-3'><FormattedMessage id="manage-user.add" /></div>
                            <form action="" method="">
                                <div class="row">
                                    <div class="form-group col-6">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" class="form-control" placeholder="Email" name="email" />
                                    </div>
                                    <div class="form-group col-6">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" class="form-control" placeholder="Password"
                                            name="password" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-6">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.fistName" /></label>
                                        <input type="text" class="form-control" placeholder="First name"
                                            name="firstName" />
                                    </div>
                                    <div class="form-group col-6">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.lastName" /></label>
                                        <input type="text" class="form-control" placeholder="Last name"
                                            name="lastName" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-9">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" class="form-control" placeholder="1234 Main St" name="address" />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.phoneNumber" /></label>
                                        <input type="text" class="form-control" name="phoneNumber" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-3">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.gender" /></label>
                                        <select class="form-control" name="gender">
                                            {gender && gender.length > 0 &&
                                                gender.map((item, index) => {
                                                    return (
                                                        <option key={index}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.role" /></label>
                                        <select class="form-control" name="role">
                                            <option value="R1" selected> Admin </option>
                                            <option value="R2"> Doctor </option>
                                            <option value="R3"> Patient </option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.position" /></label>
                                        <select class="form-control" name="position">
                                            <option value="M" selected> Position </option>
                                            <option value="F"> Female </option>
                                            <option value="O"> Other </option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label class="mb-1 mt-2"><FormattedMessage id="manage-user.image" /></label>
                                        <input type="text" class="form-control"
                                            name="image" />
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary mb-1 mt-3"><FormattedMessage id="manage-user.save" /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
