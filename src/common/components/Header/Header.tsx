import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Switch from "@mui/material/Switch"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { LinearProgress } from "@mui/material"
import { useLogoutMutation } from "../../../features/auth/api/authAPI"
import { ResultCode } from "common/enums"
import { clearTasksAndTodolists } from "common/actions/common.actions"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()

  const changeThemeMode = () => {
    dispatch(changeTheme({ theme: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(clearTasksAndTodolists({ todolists: [], tasks: {} }))
      }
    })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        {isLoggedIn && (
          <Button color="inherit" variant="outlined" onClick={logoutHandler}>
            Logout
          </Button>
        )}
        <Switch sx={{ marginLeft: "auto" }} onChange={changeThemeMode} />
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
