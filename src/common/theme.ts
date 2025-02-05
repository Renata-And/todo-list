import { createTheme } from "@mui/material/styles"
import { orange, deepPurple } from "@mui/material/colors"
import { ThemeMode } from "../app/appSlice"

export const getTheme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode,
      primary: deepPurple,
      secondary: orange,
    },
  })
}
