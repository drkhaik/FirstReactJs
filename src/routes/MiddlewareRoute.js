import React from 'react';
import { Redirect, Route, Navigate } from 'react-router-dom';
import decode from 'jwt-decode';
// import { Outlet } from 'react-router';

// export const isAdmin = () => {
//     const token = localStorage.getItem('token');
//     try {
//         const { role } = decode(token);
//         return role === 'R1';
//     } catch (error) {
//         return false;
//     }
// };

// const AdminRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = isAdmin();
//     return isAuthenticated ? (
//         <Route {...rest} render={props => <Component {...props} />} />
//     ) : (
//         <Redirect to="/" />
//     );
// };

export const isAdmin = (allowedRoles) => {
    const token = localStorage.getItem('token');
    try {
        const decoded = decode(token);
        if (!decoded) return false;
        if (allowedRoles.includes(decoded.role)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const RoleRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const isAuthenticated = isAdmin(allowedRoles);
    return isAuthenticated ? (
        <Route {...rest} render={props => <Component {...props} />} />
    ) : (
        <Redirect to="/system/admin-page" />
    );
    // return (
    //     <Route {...rest}>
    //         {isAuthenticated ? <Component {...rest} /> : <Redirect to="/" />}
    //     </Route>
    // );
};


export default RoleRoute;  