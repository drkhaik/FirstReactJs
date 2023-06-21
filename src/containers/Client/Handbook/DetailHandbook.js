import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailHandbookByIdService } from '../../../services/userService';
import _ from 'lodash';
// import { useEffect } from 'react';


class DetailHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDetailHandbook: {},
            scrollTop: 0,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let handbookId = this.props.match.params.id;
            let res = await getDetailHandbookByIdService({
                id: handbookId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailHandbook: res.data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
    }


    handleOnScroll = () => {
        this.setState({
            scrollTop: window.scrollY,
        })
        console.log("ok")
    }

    render() {
        let { dataDetailHandbook } = this.state;
        // console.log("check state: ", this.state);
        let language = this.props.lang;
        return (
            <>
                <div className='detail-handbook-container' onScroll={this.handleOnScroll}>
                    <HomeHeader />
                    {/* <div>{this.state.scrollTop}</div> */}
                    <div className='detail-handbook-body'>
                        <div className='handbook-title'>
                            {dataDetailHandbook && dataDetailHandbook.name ? dataDetailHandbook.name : ''}
                        </div>
                        <div className='author'>
                            <p> <FormattedMessage id="client.detail-handbook.prod-of" /> <span className='name'>BookingCare Minus</span></p>
                            <p> <FormattedMessage id="client.detail-handbook.author" /> <span className='name'>Drkhaik</span> </p>
                        </div>
                        <div className='handbook-detail-info-wrapper'>
                            <div className='brief-introduce'>
                                {dataDetailHandbook && dataDetailHandbook.description ? dataDetailHandbook.description : ''}
                            </div>
                            <div className='note-handbook'>
                                <i className="fas fa-lightbulb"></i>
                                <p>  <FormattedMessage id="client.detail-handbook.note" />  </p>
                            </div>

                            <div className='handbook-content'>
                                {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) &&
                                    <>
                                        <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.contentHTML }}></div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </div >
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
