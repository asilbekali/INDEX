import { Route, Routes } from "react-router-dom"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import { path } from "../hooks/paths"

const AuthRoute = () => {
  return (
    <Routes>
      <Route path={path.login} element={<Login />} />
      <Route path={path.register} element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default AuthRoute
