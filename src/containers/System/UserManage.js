import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

import { reject } from 'lodash';

class UserManage extends Component {
    /** Life cycle  
    * Run component:
    * 1. Run construct -> init state
    * 2. Did mount (set state)
    * 3. Render
    */

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: [],
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            // cap nhat lai gtri cho state
            this.setState({
                arrUsers: response.users
            }) // doi khi phai su dung call back neu du lieu qua lon , () => {console.log(...)})     
            // console.log('check state users', this.state.arrUsers)
        }
        // console.log('get user from node.js', response);
    }

    handleAddNew = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            // console.log('response from create new user in service', response)
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id ' })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
        // console.log('check data from child', data)
    }

    handleDeleteUser = async (user) => {
        // console.log('delete', user)
        try {
            let response = await deleteUserService(user.id)
            console.log(response)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = async (user) => {
        // console.log('check user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    handleUpdateUser = async (user) => {
        // let response = await editUserService(user);
        // console.log('check save changes props from child', response)
        try {
            let response = await editUserService(user);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        // console.log('check state', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    test={"abc"}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        // đưa ham` cha sang con để lay du lieu ve
                        updateUser={this.handleUpdateUser}
                    />
                }
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={() => this.handleAddNew()}>
                        <i className="fas fa-plus"></i> Add new users
                    </button>
                </div>
                <div className='user-table mt-4 mx-4'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('drkhaik check map', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
