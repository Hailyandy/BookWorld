import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ Component, ...rest }) => {
    const { user } = JSON.parse(localStorage.getItem('loginInfors'));
    // if (user && !user.isAdmin) return <Component {...props} />;
    return (
        <Route
            {...rest}
            component={<Component />}
        />
    );
};

export default ProtectedRoute;
