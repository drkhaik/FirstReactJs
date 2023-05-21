import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss";
import { getDetailInfoDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctorService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
            // console.log("check res", res)
        }
    }

    render() {
        let language = this.props.lang;
        {/* {this.props.isLoggedIn && <Header />} */ }
        // console.log(this.props.match.params.id)
        console.log('check detail doctor: ', this.state.detailDoctor)
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <React.Fragment>

                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>

                    <div className='doctor-intro'>
                        <div className='content-left' style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Detail_Section && detailDoctor.Detail_Section.description
                                    && <span>
                                        {detailDoctor.Detail_Section.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='doctor-schedule'></div>
                    <div className='doctor-detail-info'>
                        {detailDoctor.Detail_Section && detailDoctor.Detail_Section.contentHTML
                            &&
                            // React turn HTML to text
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Detail_Section.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment'></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DetailDoctorMenuPath: state.app.DetailDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
