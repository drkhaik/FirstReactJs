import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import "./TableManageUser.scss";
import MarkdownIt from 'markdown-it'; // npm install --save markdown-it@12.1.0  // dependencies
import MdEditor from 'react-markdown-editor-lite'; // npm install --save react-markdown-editor-lite@1.3.0
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    /** Life cycle  
    * Run component:
    * 1. Run construct -> init state
    * 2. Did mount (set state)
    * 3. Render
    */

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.getAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            })
        }
    }

    handleDeleteUser = (user) => {
        // console.log('check delete user', user)
        this.props.deleteUserRedux(user.id);

    }

    handleEditUser = (user) => {
        // console.log('check edit user: ', user)
        this.props.handleEditUserFromParent(user)
    }

    render() {
        // console.log('check props: ', this.props)
        // console.log('check state user Redux: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id="tableManagerUser">
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
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
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
                                            onClick={() => this.handleEditUser(item)}  ><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        // hứng action tu props
        listUsers: state.admin.users,
        // lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserRedux: () => dispatch(actions.getAllUserStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
        // createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
