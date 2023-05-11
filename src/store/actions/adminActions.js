import actionTypes from './actionTypes';
import { getAllCodeServices, createNewUserSevices, getAllUsers, deleteUserSevices, editUserSevices } from '../../services/userService';
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeServices('gender')
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

export const fetchPositionStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeServices('position')
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
            let res = await getAllCodeServices('role')
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

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFalied = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

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
            let res = await createNewUserSevices(data)
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
            let res = await editUserSevices(user)
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
            let res = await deleteUserSevices(userId)
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