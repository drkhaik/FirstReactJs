import actionTypes from './actionTypes';
import { toast } from "react-toastify";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getOutstandingDoctorService,
    getAllDoctorService,
    saveInfoDoctorService,
    getAllSpecialtyService,
} from '../../services/userService';

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                // console.log('hoi dan it check get state: ', getState)
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFalied())
            }
        } catch (e) {
            dispatch(fetchGenderFalied());
            console.log('fetchGenderStart error ', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFalied = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFalied())
            }
        } catch (e) {
            dispatch(fetchPositionFalied());
            console.log('fetchPositionFalied error ', e)
        }
    }
}

export const fetchRoleStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFalied())
            }
        } catch (e) {
            dispatch(fetchRoleFalied());
            console.log('fetchRoleFalied error ', e)
        }
    }
}


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFalied = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFalied = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            // console.log('check create new user adminAction', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess())
                dispatch(getAllUserStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})


export const getAllUserStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                // console.log('hoi dan it check responde: ', res)
                dispatch(getAllUserSuccess(res.users.reverse()))
            } else {
                toast.error("Get all users error!");
                dispatch(getAllUserFailed())
            }
        } catch (e) {
            toast.error("Get all users error!");
            dispatch(getAllUserFailed());
            console.log('fetchAllUserFailed error ', e)
        }
    }
}

export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users: data,
})

export const getAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USERS_FAILED,
})

export const editUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                toast.success("Update the user succeed!");
                dispatch(editUserSuccess())
                dispatch(getAllUserStart())
            } else {
                toast.error("Update the user error!");
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
            console.log('editUserFailed error ', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USERS_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USERS_FAILED,
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess())
                dispatch(getAllUserStart())
            } else {
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log('saveUserFailed error ', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})


export const getOutstandingDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getOutstandingDoctorService('');
            // console.log('check get outstanding doctor', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_OUTSTANDING_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_OUTSTANDING_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('GET_OUTSTANDING_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.GET_OUTSTANDING_DOCTOR_FAILED
            })
        }
    }
}

export const getAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            // console.log('check get all doctor', res)
            if (res && res.errCode === 0) {
                toast.success("Get all Doctor info succeed!");
                dispatch({
                    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('GET_ALL_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.GET_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInfoDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save information of Doctor succeed!");
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
                })
            } else {
                console.log('check error from adminActions: ', res);
                toast.error("Save information of Doctor failed!");
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('SAVE_INFO_DOCTOR_FAILED', e)
            toast.error("Save information of Doctor failed!");
            dispatch({
                type: actionTypes.SAVE_INFO_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            // console.log('check get all doctor', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const fetchDoctorRequiredInfo = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialtyService();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                }
                // console.log('hoi dan it check get state: ', getState)
                dispatch(fetchDoctorRequiredInfoSuccess(data))
            } else {
                dispatch(fetchDoctorRequiredInfoFailed())
            }
        } catch (e) {
            dispatch(fetchDoctorRequiredInfoFailed());
            console.log('fetchDoctorRequiredInfoFailed error ', e)
        }
    }
}

export const fetchDoctorRequiredInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
})
export const fetchDoctorRequiredInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})