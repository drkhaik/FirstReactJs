import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllClinicService } from '../../../services/userService';
import { withRouter } from 'react-router';

class ProminentClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrClinic: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        let res = await getAllClinicService();
        // console.log("check res", res)
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (infoClinic) => {
        // console.log('view info: ', infoClinic)
        // redirect
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${infoClinic.id}`);
        }
    }
    // ProminentClinic

    render() {
        let { arrClinic } = this.state;
        return (
            <div className='main-section section-health-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="home-page.prominent-clinic" /> </span>
                        <button className='btn-section'><FormattedMessage id="home-page.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {/* <div className='section-customize'>
                                <div className='img section-health-facility'> </div>
                                <div>Bệnh viện Hữu nghị Việt Đức 1</div>
                            </div> */}
                            {arrClinic && arrClinic.length > 0 &&
                                arrClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            {/* <div className='img section-prominent-clinic'
                                                style={{ backgroundImage: `url(${item.image})` }}> </div> */}
                                            <img className='img section-prominent-clinic' src={`${item.image}`} />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProminentClinic));
