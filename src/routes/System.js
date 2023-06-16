import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminPage from '../containers/System/AdminPage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import Header from '../containers/Header/Header';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import RoleRoute from './MiddlewareRoute';
import { USER_ROLE } from '../utils';
// import { userRoleIsAdmin } from '../hoc/authentication';

class System extends Component {

    render() {
        {/* {this.props.isLoggedIn && <Header />} */ }

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <RoleRoute path="/system/admin-page" allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.DOCTOR]} component={AdminPage} />
                            <RoleRoute path="/system/user-redux" allowedRoles={[USER_ROLE.ADMIN]} component={UserRedux} />
                            <RoleRoute path="/system/manage-doctor" allowedRoles={[USER_ROLE.ADMIN]} component={ManageDoctor} />
                            <RoleRoute path="/system/manage-specialty" allowedRoles={[USER_ROLE.ADMIN]} component={ManageSpecialty} />
                            <RoleRoute path="/system/manage-clinic" allowedRoles={[USER_ROLE.ADMIN]} component={ManageClinic} />
                            <RoleRoute component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
