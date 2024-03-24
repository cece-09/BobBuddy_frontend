import { MatchRequest } from "@/types/server"
import request from "./fetch/request"
import { jsonifyResponse } from "@/utils/server"
import { ErrorCode } from "@/utils/error"

export const requestMatch = async (body: MatchRequest): Promise<any> => {
  try {
    const result = await request("/match", {
      method: "PUT",
    }).then(r => {
      return jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR)
    })
    console.log(result)
    return result
  } catch (error) {
    const errorMsg = `request match fail: ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestMatchJoin = async (): Promise<any> => {
  try {
    const result = await request("/match", {
      method: "POST",
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR))
    console.log(result)
    return result
  } catch (error) {
    const errorMsg = `request match join fail: ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestMatchExit = async (): Promise<any> => {
  try {
    const result = await request("/match", {
      method: "DELETE",
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR))
    console.log(result)
    return result
  } catch (error) {
    const errorMsg = `request match exit fail: ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}

export const requestMatchCancel = async (): Promise<any> => {
  try {
    const result = await request("/match", {
      method: "PATCH",
    }).then(r => jsonifyResponse<any>(r, ErrorCode.MATCH_GENERAL_ERROR))
    console.log(result)
    return result
  } catch (error) {
    const errorMsg = `request match cancel fail: ${JSON.stringify(error)}`
    console.error(errorMsg)
    return undefined
  }
}
