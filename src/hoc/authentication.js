import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import actionTypes from '../store/actions/actionTypes';
import decode from 'jwt-decode';
const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});


// export const userRoleIsAdmin = (Component) => {
//     const allowedRoles = ['R1'];
//     return connectedRouterRedirect({
//         authenticatedSelector: (state) => state.user.userAccessToken,
//         wrapperDisplayName: 'userRoleIsAdmin',
//         redirectPath: '/system/admin-page',
//         redirectAction: () => (dispatch, state) => {
//             const { user } = state();
//             if (!user.userAccessToken) {
//                 // console.log("userAccessToken 1", user.userAccessToken)
//                 return dispatch({ type: UNAUTHORIZED_ACCESS });
//             } else {
//                 // const decodedToken = decodeJWTToken(user.token);
//                 const decodedToken = decode(user.userAccessToken);
//                 const userRole = decodedToken.role;
//                 if (!allowedRoles.includes(userRole)) {
//                     return dispatch({ type: UNAUTHORIZED_ACCESS });
//                 }
//             }
//         }
//     })(Component);
// };

// export const UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS';

