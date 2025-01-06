import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "./../hooks/useUser";

export function ProtectedRoute({allowedRoles}) {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Cargando...</div>;
      }
    
    if (!user) {
        return <Navigate to="/" replace/>;
    }

    if (!allowedRoles.includes(user.rol)) {
        return <Navigate to="/access-denied"/>;
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};
