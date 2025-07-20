import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/UserContext";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/home";
import Products from "./pages/Products";
import Order from "./pages/Order";

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const { token } = useContext(Context);
    const location = useLocation();

    if (!token) {
        const publicPaths = ["/login", "/register"];
        if (!publicPaths.includes(location.pathname)) {
            return <Navigate to="/login" replace />;
        }
    }

    return children;
};

function App() {
    return (
        <ProtectedRoutes>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
                <Route path="/products" element={<Products />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ProtectedRoutes>
    );
}

export default App;
