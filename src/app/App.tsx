import { useAppDispatch, useAppSelector } from "./hooks"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackBar, Header } from "common/components"
import { getTheme } from "common/theme"
import { Routing } from "common/routing"
import { useEffect } from "react"
import { initializeApp, selectIsInitialized } from "../features/auth/model/authSlice"
import s from "./App.module.css"
import { selectThemeMode } from "./appSlice"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackBar />
      </ThemeProvider>
    </div>
  )
}
