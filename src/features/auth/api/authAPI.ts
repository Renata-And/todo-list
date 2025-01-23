import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types/types"
import type { LoginArgs, MeResponse } from "./authApi.types"
import { baseApi } from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<MeResponse>, void>({
      query: () => "auth/me",
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",
      }),
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const _authApi = {
  login(arg: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", arg)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<MeResponse>>("auth/me")
  },
}
