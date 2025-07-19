import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/UserContext";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const { token } = useContext(Context);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
