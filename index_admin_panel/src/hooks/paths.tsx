// paths.tsx
import { NavLink } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/home";
import Order from "../pages/Order";
import Products from "../pages/Products";

export const path = {
    home: "/",
    login: "/login",
    register: "/register",
    product: "/product",
    order: "/order",
    notFound: "*",
};

export const DashboardRouteList = [
    {
        id: 1,
        path: path.home,
        element: <Home />,
    },
    {
        id: 2,
        path: path.login,
        element: <Login />,
    },
    {
        id: 3,
        path: path.register,
        element: <Register />,
    },
    {
        id: 4,
        path: path.product,
        element: <Products />,
    },
    {
        id: 5,
        path: path.order,
        element: <Order />,
    },
];

export const DashboardNavList = [
    {
        key: 1,
        label: <NavLink to={path.product}>Yo'nalishlar</NavLink>,
    },
    {
        key: 2,
        label: <NavLink to={path.order}>Guruxlar</NavLink>,
    },
];
