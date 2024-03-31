import { jsonifyResponse } from "@/utils/server"
import request from "./fetch/request"
import {
  UserInfoResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from "@/types/server"
import { User } from "@/providers/userAtom"
import { ErrorCode } from "@/utils/error"

export const requestUserInfo = async (): Promise<
  UserInfoResponse | undefined
> => {
  try {
    const result = await request("/user/info", {
      method: "GET",
    }).then(r => jsonifyResponse<UserInfoResponse>(r, ErrorCode.NETWORK_ERROR))

    return result
  } catch (error) {
    const errorMsg = `Failed to fetch user info ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestUserUpdate = async (
  body: UserUpdateRequest,
): Promise<UserUpdateResponse | undefined> => {
  try {
    const result = await request("/user/update", {
      method: "PATCH",
      body: JSON.stringify(body),
    }).then(r =>
      jsonifyResponse<UserUpdateResponse>(r, ErrorCode.NETWORK_ERROR),
    )
    return result
  } catch (error) {
    const errorMsg = `Failed to update user info ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestValidatePassword = async (body: {
  typedPwd: string
}): Promise<boolean | undefined> => {
  try {
    const result = await request("/user/validate/password", {
      method: "POST",
      body: JSON.stringify(body),
    }).then(r => r.ok)
    return result
  } catch (error) {
    const errorMsg = `Failed to validate password ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestUpdatePassword = async (body: {
  updatePwd: string
}): Promise<boolean | undefined> => {
  try {
    const result = await request("/user/update/password", {
      method: "PATCH",
      body: JSON.stringify(body),
    }).then(r => r.ok)
    return result
  } catch (error) {
    const errorMsg = `Failed to update password ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestUserWithdraw = async (): Promise<boolean | undefined> => {
  try {
    const result = await request("/user/withdraw", {
      method: "DELETE",
    }).then(r => r.ok)
    return result
  } catch (error) {
    const errorMsg = `Failed to withdraw user ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestProfile = async () => {
  try {
    const result = await request("/profile", {
      method: "GET",
    }).then(r => jsonifyResponse<any>(r, ErrorCode.NETWORK_ERROR))
    console.log(result)
    return result
  } catch (error) {
    const errorMsg = `Failed to get user profile ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestProfileUpdate = async (
  body: Record<keyof User, string>,
) => {
  try {
    const result = await request("/profile/update", {
      method: "PATCH",
      body: JSON.stringify(body),
    }).then(r => jsonifyResponse<any>(r, ErrorCode.NETWORK_ERROR))
    console.log(result)
    return result
  } catch (error) {
    const errorMsg = `Failed to update profile ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestProfileImageUpload = async (
  form: EventTarget & HTMLFormElement,
): Promise<boolean | undefined> => {
  try {
    const result = await request("/profile/image", {
      method: form.method,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: new FormData(form),
    }).then(r => r.ok)
    return result
  } catch (error) {
    const errorMsg = `Failed to upload profile image ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}
