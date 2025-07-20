
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { Home } from "lucide-react";
import OrdersPage from "../pages/Order";
import Products from "../pages/Products";

export const path = {
    home: "/",
    login: "/login",
    register: "/register",
    product: "/product",
    order: "/order",
    category: "/category",
    notFound: "*",
};

export const DashboardRouteList = [
    {
        id: 1,
        path: path.home,
        element: <Home />
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
        element: <Products />
    },
    {
        id: 5,
        path: path.order,
        element: <OrdersPage />,
    },
];

