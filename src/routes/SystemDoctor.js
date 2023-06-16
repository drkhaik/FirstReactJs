import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import AdminPage from '../containers/System/AdminPage';
import RoleRoute from './MiddlewareRoute';
import { USER_ROLE } from '../utils';

class SystemDoctor extends Component {
    render() {
        {/* {this.props.isLoggedIn && <Header />} */ }

        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/admin-page" component={AdminPage} />
                            <RoleRoute path="/doctor/manage-schedule" allowedRoles={[USER_ROLE.DOCTOR, USER_ROLE.ADMIN]} component={ManageSchedule} />
                            <RoleRoute path="/doctor/manage-patient" allowedRoles={[USER_ROLE.DOCTOR]} component={ManagePatient} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemDoctor);
