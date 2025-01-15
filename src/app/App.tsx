import { useAppSelector } from "./hooks"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackBar, Header } from "common/components"
import { getTheme } from "common/theme"
import { selectThemeMode } from "./app-selectors"
import { Routing } from "common/routing"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

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
