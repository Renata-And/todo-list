import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeThemeAC } from '../../../app/app-reducer';
import {selectThemeMode} from '../../../app/app-selectors';

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const changeThemeMode = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" variant="outlined">Login</Button>
        <Switch sx={{ marginLeft: 'auto' }} onChange={changeThemeMode} />
      </Toolbar>
    </AppBar>
  )
}
