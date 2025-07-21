import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRouteList } from "../hooks/paths"
import { useContext } from "react"
import { Context } from "../context/UserContext"
import NotFound from "../pages/NotFound"

export default function DashboardRoutes() {
    const { token } = useContext(Context)

    return (
        <Routes>
            {DashboardRouteList.map((item) =>
                token ? (
                    <Route key={item.id} path={item.path} element={item.element} />
                ) : null
            )}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    )
}
