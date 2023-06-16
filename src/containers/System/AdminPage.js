import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import "./AdminPage.scss";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

import { reject } from 'lodash';

class AdminPage extends Component {
    /** Life cycle  
    * Run component:
    * 1. Run construct -> init state
    * 2. Did mount (set state)
    * 3. Render
    */

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        // await this.getAllUsersFromReact();
    }

    // getAllUsersFromReact = async () => {
    //     let response = await getAllUsers('ALL');
    //     if (response && response.errCode === 0) {
    //         // cap nhat lai gtri cho state
    //         this.setState({
    //             arrUsers: response.users
    //         }) // doi khi phai su dung call back neu du lieu qua lon , () => {console.log(...)})     
    //         // console.log('check state users', this.state.arrUsers)
    //     }
    //     // console.log('get user from node.js', response);
    // }

    render() {
        // console.log('check state', this.state)
        let arrUsers = this.state.arrUsers
        const style = {
            height: "400px",
        };
        return (
            <div className="users-container container" style={style}>
                <div className="title text-center">Admin page</div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
