import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "./../hooks/useUser";

export function ProtectedRoute({allowedRoles}) {
    const { user, logout } = useUser();
    
    if (!user) {
        console.log("No hay usuario");
        return <Navigate to="/" replace/>;
    }

    if (!allowedRoles.includes(user.rol)) {
        console.log("No tiene permisos");
        return <Navigate to="/access-denied" replace/>;
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};
