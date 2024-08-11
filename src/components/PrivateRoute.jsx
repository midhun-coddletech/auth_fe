// PrivateRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = () => {
        // Your logic to check if user is authenticated
        return localStorage.getItem('token') !== null;
    };

    return (
        <Route
            {...rest}
            element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
