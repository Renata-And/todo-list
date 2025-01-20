import { setAppError, setAppStatus } from "../../app/appSlice"
import type { AppDispatch } from "../../app/store"

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppError({ error: err.message }))
  dispatch(setAppStatus({ status: "failed" }))
}
