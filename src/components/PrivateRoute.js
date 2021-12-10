import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ children, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    let location = useLocation();
    if (!currentUser) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
};

export default PrivateRoute;
