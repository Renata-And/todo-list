import { Route, Routes } from "react-router"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components"

export const PATH = {
  MAIN: "/",
  LOGIN: "login",
  NOT_FOUND: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.MAIN} element={<Main />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.NOT_FOUND} element={<Page404 />} />
    </Routes>
  )
}
