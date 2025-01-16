import { instance } from "common/instance/instance"
import type { BaseResponse } from "common/types/types"
import type { LoginArgs, MeResponse } from "./authApi.types"

export const authApi = {
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
