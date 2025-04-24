import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" />;

};

export default PrivateRoute;