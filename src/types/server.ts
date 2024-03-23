import { ServerCode } from "@/server/code"

export interface FetchResponse {
  ok: boolean
  status: number
  json: () => Promise<any>
}

export interface SeverFetchResponse {
  ok: boolean
  status: number
  text: string | undefined
}

export interface ClientFetchReponse {
  ok: boolean
  status: number
  json: () => Promise<any>
}

export type ErrorResponse = {
  code: string
  msg: string
}

export interface SignInRequest {
  userEmail: string
  pwd: string
}

export type SignInResponse =
  | {
      code: ServerCode.SIGN_IN_SUCCESS
      msg: string
      token: string
    }
  | ErrorResponse

export interface SignUpRequest {
  userEmail: string
  userName: string
  pwd: string
}

export interface MatchRequest {
  location: string
}
