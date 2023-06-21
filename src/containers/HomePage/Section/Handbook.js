import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllHandbookService } from '../../../services/userService';
import Slider from "react-slick";


class Handbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrHandbook: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        let res = await getAllHandbookService();
        // console.log("check res", res)
        if (res && res.errCode === 0) {
            this.setState({
                arrHandbook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (infoHandbook) => {
        // console.log('view info: ', infoClinic)
        // redirect
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${infoHandbook.id}`);
        }
    }

    render() {
        // let settingsHB = this.props.settings;
        // settingsHB.slidesToShow = 2;
        // console.log(settingsHB.slidesToShow);
        // console.log('check handbook setting: ', settingsHB);
        let { arrHandbook } = this.state;
        return (
            <div className='main-section section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Cẩm nang</span>
                        <button className='btn-section'>Tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        {/* <Slider {...settingsHB}> */}
                        <Slider {...this.props.settings}>
                            {arrHandbook && arrHandbook.length > 0 &&
                                arrHandbook.map((item, index) => {
                                    return (
                                        <a className='section-customize handbook-customize' key={index} onClick={() => this.handleViewDetailHandbook(item)}>
                                            <div className='outer-img'>
                                                <img className='section-handbook' src={`${item.image}`} />
                                            </div>
                                            <div className='handbook-title'>
                                                <p>{item.name}</p>
                                            </div>
                                        </a>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
