import type { Dispatch } from "redux"
import { setAppStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authAPI"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import type { LoginArgs } from "../api/authApi.types"
import { clearTodosDataAC } from "../../todolists/model/todolists-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.removeItem("sn-token")
        dispatch(clearTodosDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
