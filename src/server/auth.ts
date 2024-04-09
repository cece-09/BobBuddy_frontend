import {
  BaseResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "@/types/server"
import request from "./fetch/request"
import { getAccessToken, jsonifyResponse, setAccessToken } from "@/utils/server"
import { ServerCode } from "./code"
import { BuddyError, ErrorCode, handleError } from "@/utils/error"

export const requestSignIn = async (
  body: SignInRequest,
): Promise<boolean | undefined> => {
  try {
    const result = await request("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(body),
    }).then(r => jsonifyResponse<SignInResponse>(r, ErrorCode.SIGN_IN_ERROR))

    if (result.code !== ServerCode.SIGN_IN_SUCCESS || !result.token) {
      throw new BuddyError(ErrorCode.SIGN_IN_ERROR, JSON.stringify(request))
    }

    setAccessToken(result.token)
    return true
  } catch (error) {
    const errorMsg = `request sign in fail:`
    await handleError(error, errorMsg)
    return undefined
  }
}

export const requestSignUp = async (
  props: SignUpRequest,
): Promise<boolean | undefined> => {
  const body = JSON.stringify(props)
  try {
    const result = await request("/user/signup", {
      method: "POST",
      body,
    })
    return result.ok
  } catch (error) {
    const errorMsg = `request sign up fail`
    await handleError(error, errorMsg)
    return undefined
  }
}

export const requestSignOut = async (): Promise<boolean> => {
  try {
    const result = await request("/auth/sign-out", { method: "POST" }).then(r =>
      jsonifyResponse<BaseResponse>(r, ErrorCode.SIGN_OUT_ERROR),
    )
    if (result.code !== ServerCode.SIGN_OUT_SUCCESS) {
      throw new BuddyError(ErrorCode.SIGN_OUT_ERROR, JSON.stringify(result))
    }
    return true
  } catch (error) {
    const errorMsg = `request sign out fail`
    await handleError(error, errorMsg)
    return false
  }
}

export const requestSendEmail = async (body: {
  userEmail: string
}): Promise<boolean | undefined> => {
  try {
    const result = await request("/user/signup/send", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return result.ok
  } catch (error) {
    const errorMsg = `request send email fail`
    await handleError(error, errorMsg)
    return false
  }
}

export const requestVerify = async (body: {
  email: string
  authNumber: string
}): Promise<boolean | undefined> => {
  try {
    const result = await request("/user/signup/verify", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return result.ok
  } catch (error) {
    const errorMsg = `request email verificaiton fail`
    await handleError(error, errorMsg)
    return false
  }
}

export const requestFindPassword = async (body: {
  email: string
}): Promise<boolean | undefined> => {
  try {
    const result = await request("/user/find/password", {
      method: "POST",
      body: JSON.stringify(body),
    })
    return result.ok
  } catch (error) {
    const errorMsg = `request find password fail`
    await handleError(error, errorMsg)
    return undefined
  }
}

export const requestValidateToken = async (): Promise<boolean> => {
  const token = getAccessToken()
  if (token === undefined) {
    return false
  }
  return true
  //   try {
  //     const result = await request("/auth/validate-token", {
  //       method: "POST",
  //       body: JSON.stringify(token),
  //     })
  //     return result.ok
  //   } catch (error) {
  //     const errorMsg = `request validate token fail: ${JSON.stringify(error)}`
  //     console.error(errorMsg)
  //     return undefined
  //   }
}
