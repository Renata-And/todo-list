import { useAppSelector } from "./hooks"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Header } from "common/components"
import { Main } from "./Main"
import { getTheme } from "common/theme"
import { selectThemeMode } from "./app-selectors"

function AppWithRedux() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default AppWithRedux

export class TasksState {}
