import { type UnknownAction } from "redux"
import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice"
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice"
import { appReducer, appSlice } from "./appSlice"
import { type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { authReducer, authSlice } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>
