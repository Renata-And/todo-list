import { setAppError, setAppStatus } from "../../app/appSlice"
import type { AppDispatch } from "../../app/store"
import type { BaseResponse } from "common/types/types"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  dispatch(setAppStatus({ status: "failed" }))
}
