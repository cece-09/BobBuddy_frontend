import {
  BaseResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "@/types/server"
import request, { getAccessToken, setAccessToken } from "./fetch/request"
import { jsonifyResponse } from "@/utils/server"
import { ServerCode } from "./code"

export const requestSignIn = async (
  body: SignInRequest,
): Promise<boolean | undefined> => {
  try {
    const result = await request("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(body),
    }).then(r => jsonifyResponse<SignInResponse>(r))

    if (result.code === ServerCode.SIGN_IN_SUCCESS && result.token) {
      setAccessToken(result.token)
      return true
    }

    throw new Error(`${result.msg} code: ${result.code}`)
  } catch (error) {
    console.error(`Failed to request sign in: `, error)
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
  } catch (e) {
    console.error(`Failed to request sign-up`)
    return undefined
  }
}

export const requestSignOut = async (): Promise<boolean> => {
  try {
    const result = await request("/auth/sign-out", { method: "POST" }).then(r =>
      jsonifyResponse<BaseResponse>(r),
    )
    if (result.code === ServerCode.SIGN_OUT_SUCCESS) {
      return true
    }
    throw new Error(`${result.msg} code: ${result.code}`)
  } catch (error) {
    const errorMsg = `Failed to sign out ${JSON.stringify(error)}`
    console.error(errorMsg)
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
    console.error(`Faile to request sending email ${JSON.stringify(error)}`)
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
    console.error(
      `Failed to request email verificaiton ${JSON.stringify(error)}`,
    )
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
    const errorMsg = `Failed to request find password ${JSON.stringify(error)}`
    console.error(errorMsg)
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
  //     const errorMsg = `Failed to validate token ${JSON.stringify(error)}`
  //     return undefined
  //   }
}
