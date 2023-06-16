import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userAccessToken: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            // console.log("check action access token", action.userInfo.accessToken)
            // console.log("check action", action)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo.user,
                userAccessToken: action.userInfo.accessToken
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                userAccessToken: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                userAccessToken: null
            }
        default:
            return state;
    }
}

export default userReducer;