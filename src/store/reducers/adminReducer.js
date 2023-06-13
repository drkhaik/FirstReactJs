import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    outstandingDoctor: [],
    allDoctor: [],
    allScheduleTime: [],

    allRequiredDoctorInfo: [],
    allClinicData: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log('hoi dan it fire fetch gender start 123: ', action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            // console.log('hoi dan it fire fetch gender success: ', action)
            // console.log('hoi dan it fire fetch gender success 123abc: ', action.data)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('hoi dan it fire fetch gender failed: ', action)
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,
            }

        case actionTypes.GET_ALL_USERS_SUCCESS:
            state.users = action.users;
            // console.log('hoi dan it check get all users: ', action.users)
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state,
            }

        case actionTypes.GET_OUTSTANDING_DOCTOR_SUCCESS:
            state.outstandingDoctor = action.dataDoctors;
            // console.log('hoi dan it check get all users: ', action.users)
            return {
                ...state,
            }
        case actionTypes.GET_OUTSTANDING_DOCTOR_FAILED:
            state.outstandingDoctor = []
            return {
                ...state,
            }

        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.dataDoctors;
            // console.log('hoi dan it check get all users: ', action.users)
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTOR_FAILED:
            state.allDoctor = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = []
            return {
                ...state,
            }


        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.allClinicData = action.data;
            // console.log("check action", action)
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            state.allClinicData = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;