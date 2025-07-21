import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import { path } from "../hooks/paths"
import NotFound from "../pages/NotFound"

const AuthRoute = () => {
  return (
    <>
      <Routes>
        <Route path={path.login} element={<Login />} />
        <Route path={path.register} element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  )
}

export default AuthRoute
