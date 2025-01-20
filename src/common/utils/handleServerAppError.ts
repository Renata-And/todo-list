import { setAppError, setAppStatus } from "../../app/appSlice"
import type { BaseResponse } from "common/types/types"
import type { Dispatch } from "redux"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  dispatch(setAppStatus({ status: "failed" }))
}
