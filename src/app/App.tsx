import { useAppDispatch, useAppSelector } from "./hooks"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackBar, Header } from "common/components"
import { getTheme } from "common/theme"
import { Routing } from "common/routing"
import { useEffect, useState } from "react"
import s from "./App.module.css"
import { selectThemeMode } from "./appSlice"
import { useMeQuery } from "../features/auth/api/authAPI"
import { ResultCode } from "common/enums"
import { setIsLoggedIn } from "../features/auth/model/authSlice"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  // const isInitialized = useAppSelector(selectIsInitialized)

  const [isInitialized, setIsInitialized] = useState(false)
  const { isLoading, data } = useMeQuery()

  // useEffect(() => {
  //   dispatch(initializeApp())
  // }, [])

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackBar />
      </ThemeProvider>
    </div>
  )
}
