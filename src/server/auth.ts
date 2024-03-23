import { SignInRequest, SignInResponse, SignUpRequest } from "@/types/server"
import request from "./fetch/request"
import { jsonifyResponse } from "@/utils/server"
import { ServerCode } from "./code"

export const requestSignIn = async (
  body: SignInRequest,
): Promise<boolean | undefined> => {
  try {
    const result = await request("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(body),
    }).then(r => {
      return jsonifyResponse<SignInResponse>(r, `Cannot jsonify`)
    })

    return result.code === ServerCode.SIGN_IN_SUCCESS
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
