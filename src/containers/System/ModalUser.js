import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        // emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
        //     console.log('listen emitter from parent: ',data)
        // })
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                role: '',
            })
        })
    }

    componentDidMount() {
        console.log('mounting modal')
    }

    toggle = () => {
        // lay function tu cha sang con qua props
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        // console.log(event.target.value, id)

        // bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state: ', this.state)
        // })

        // good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    // this.state.arrInput[i] == this.state[arrInput[i]]

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'role'];
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // call API create Modal
            // console.log('check props child', this.props)
            // chuyen du lieu tu con sang cha
            this.props.createNewUser(this.state);
            // console.log('check data add new ', this.state)   
        }
    }

    render() {
        // console.log('check child props', this.props)
        // console.log('check child open modal', this.props.isOpen)
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create New User</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className="input-container">
                            <label for="inputEmail" className="mb-1 mt-2">Email</label>
                            <input type="email"
                                className="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                placeholder="Email"
                                value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label for="inputPassword" className="mb-1 mt-2">Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password} />
                        </div>
                        <div className="input-container">
                            <label for="inputFirstName" className="mb-1 mt-2">First Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder="First Name" name="firstName"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label for="inputLastName" className="mb-1 mt-2">Last Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName} />
                        </div>
                        <div className="input-container max-width-input">
                            <label for="inputAddress" className="mb-1 mt-2">Address</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address} />
                        </div>
                        <div className="input-container one-third-width-input">
                            <label for="inputPhoneNumber" className="mb-1 mt-2">Phone Number</label>
                            <input type="tel"
                                className="form-control"
                                placeholder="Phone Number"
                                name="phoneNumber"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                value={this.state.phoneNumber} />
                        </div>
                        <div className="input-container one-third-width-input">
                            <label for="inputGender" className="mb-1 mt-2">Gender</label>
                            <select id="inputGender" className="form-control" name="gender"
                                onChange={(event) => { this.handleOnChangeInput(event, "gender") }}
                                value={this.state.gender}>
                                <option value="#" selected> Choose </option>
                                <option value="M"> Male </option>
                                <option value="F"> Female </option>
                                <option value="O"> Other </option>
                            </select>
                        </div>
                        <div className="input-container one-third-width-input">
                            <label for="inputRole" className="mb-1 mt-2">Role</label>
                            <select id="inputRole" className="form-control" name="role"
                                onChange={(event) => { this.handleOnChangeInput(event, "role") }}
                                value={this.state.role}>
                                <option value="#" selected> Choose </option>
                                <option value="R1"> Admin </option>
                                <option value="R2"> Doctor </option>
                                <option value="R3"> Patient </option>
                            </select>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



