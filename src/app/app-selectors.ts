import type { RootState } from "./store"
import type { RequestStatus, ThemeMode } from "./app-reducer"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
export const selectAppStatus = (state: RootState): RequestStatus => state.app.status
export const selectAppError = (state: RootState) => state.app.error
