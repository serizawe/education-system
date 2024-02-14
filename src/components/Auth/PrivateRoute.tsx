import React, { ReactNode } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom'; // Add 'Routes' to the import statement
import { useAppSelector } from '../../redux/store';


interface PrivateRouteProps {
    children: ReactNode;
    allowedUserTypes: string[]; // Assuming allowedUserTypes is an array of string user types
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedUserTypes }) => {
    const role = useAppSelector(state => state.auth.role); 
    if (!role || !allowedUserTypes.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
