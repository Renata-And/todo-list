import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Switch from "@mui/material/Switch"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { changeThemeAC } from "../../../app/app-reducer"
import { selectAppStatus, selectThemeMode } from "../../../app/app-selectors"
import { LinearProgress } from "@mui/material"
import { selectIsLoggedIn } from "../../../features/auth/model/auth-selectors"
import { logoutTC } from "../../../features/auth/model/auth-reducer"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const changeThemeMode = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
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
