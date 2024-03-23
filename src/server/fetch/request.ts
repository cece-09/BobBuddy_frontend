import {
  ClientFetchReponse,
  FetchResponse,
  SeverFetchResponse,
} from "@/types/server"
import { serverFetch } from "./server"
import { clientFetch } from "./client"

const DEFAULT_HEADER: HeadersInit = {
  "Content-Type": "application/json",
}

const request = async (
  uri: string,
  init: RequestInit,
): Promise<FetchResponse> => {
  const prefix = getServerUri()
  const isUserRequest = !uri.includes("auth")
  const token = isUserRequest ? getAccessToken() : undefined

  const newInit: RequestInit = (() => {
    const newHeader: HeadersInit = token
      ? {
          ...DEFAULT_HEADER,
          Authorization: token,
        }
      : DEFAULT_HEADER
    return { ...init, headers: { ...init.headers, ...newHeader } }
  })()

  const requesetUri: string = (() => {
    if (uri.includes(getServerUri())) {
      return uri
    } else {
      return prefix + uri
    }
  })()

  console.debug(`[${init.method}] ${uri}`)
  console.debug(`${JSON.stringify(newInit)}`)

  if (process.env.NODE_ENV === "development") {
    const result: SeverFetchResponse = await serverFetch(requesetUri, newInit)
    return {
      ...result,
      json: () => (result.text ? JSON.parse(result.text) : undefined),
    }
  } else {
    const result: ClientFetchReponse = await clientFetch(requesetUri, newInit)
    return result
  }
}

export default request

export const getServerUri = (): string => {
  const REMOTE_URI = process.env.NEXT_PUBLIC_SERVER_URI
  return REMOTE_URI!
}

export const getNextUri = (): string => {
  return `http://localhost:3000`
}

export const getAccessToken = (): string | undefined => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; token=`)
  if (parts.length === 2) {
    return parts.pop()?.split(`;`).shift()
  }
  return undefined
}
