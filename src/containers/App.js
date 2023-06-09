import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from '../containers/Auth/Login';
import System from '../routes/System';
import SystemDoctor from '../routes/SystemDoctor';
import { CustomToastCloseButton } from '../components/CustomToast';
// import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage.js';
import CustomScrollbars from '../components/CustomScrollbars'
import DetailDoctor from './Client/Doctor/DetailDoctor';
import VerifyEmail from './Client/VerifyEmail';
import DetailSpecialty from './Client/Specialty/DetailSpecialty';
import DetailClinic from './Client/Clinic/DetailClinic';
import DetailHandbook from './Client/Handbook/DetailHandbook';
import LoadingOverLay from 'react-loading-overlay';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {/* <ConfirmModal /> */}
                        {/* {this.props.isLoggedIn && <Header />} */}
                        <LoadingOverLay
                            active={this.props.isLoading}
                            spinner
                            text="Loading..."
                        >
                            <div className="content-container">
                                <CustomScrollbars style={{ height: '100vh', width: '100%' }} >
                                    <Switch>
                                        <Route path={path.HOME} exact component={(Home)} />
                                        <Route path={path.HOMEPAGE} component={HomePage} />
                                        <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                        <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                        <Route path={path.DOCTOR} component={userIsAuthenticated(SystemDoctor)} />
                                        {/* import DetailDoctor component */}
                                        <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                        <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                        <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                        <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
                                        <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                                    </Switch>
                                </CustomScrollbars>
                            </div>
                        </LoadingOverLay>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isLoading: state.app.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // isLoadingAppRedux: (isLoading) => dispatch(isLoadingApp(isLoading))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);