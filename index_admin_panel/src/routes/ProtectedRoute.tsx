import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/UserContext";

const ProtectedRoute = () => {
    const { token } = useContext(Context);
    const location = useLocation();

    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!token && !isPublicRoute) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
