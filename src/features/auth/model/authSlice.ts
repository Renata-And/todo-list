import { setAppStatus } from "../../../app/appSlice"
import { authApi } from "../api/authAPI"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import type { LoginArgs } from "../api/authApi.types"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"

const createSliceWithThunks = buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })

export const authSlice = createSliceWithThunks({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()

    return {
      setIsLoggedIn: createAThunk(
        async (payload: { data: LoginArgs }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authApi.login(payload.data)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              localStorage.setItem("sn-token", res.data.data.token)
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
      setIsLoggedOut: createAThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authApi.logout()
            if (res.data.resultCode === ResultCode.Success) {
              localStorage.removeItem("sn-token")
              dispatch(clearTasksAndTodolists({ todolists: [], tasks: {} }))
              dispatch(setAppStatus({ status: "succeeded" }))
              return { isLoggedIn: false }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isInitialized = action.payload.isLoggedIn
          },
        },
      ),
      initializeApp: createAThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authApi.me()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (err) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
          settled: (state) => {
            state.isInitialized = true
          },
        },
      ),
    }
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const { setIsLoggedIn, setIsLoggedOut, initializeApp } = authSlice.actions
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors
