import { BaseResponse, MatchRequest, MatchResponse } from "@/types/server"
import request from "./fetch/request"
import { jsonifyResponse } from "@/utils/server"
import { BuddyError, ErrorCode, handleError } from "@/utils/error"

export const requestMatch = async (
  body: MatchRequest,
): Promise<MatchResponse> => {
  try {
    const result: MatchResponse = await request("/match", {
      method: "PUT",
    }).then(r => {
      return jsonifyResponse<MatchResponse>(r, ErrorCode.MATCH_GENERAL_ERROR)
    })
    if (result === undefined) {
      throw new BuddyError(ErrorCode.MATCH_GENERAL_ERROR, "result is empty")
    }
    return result
  } catch (error) {
    const errorMsg = `request match fail`
    return await handleError(error, errorMsg)
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
    const errorMsg = `request match join fail`
    await handleError(error, errorMsg)
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
    const errorMsg = `request match exit fail`
    await handleError(error, errorMsg)
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
    const errorMsg = `request match cancel fail`
    await handleError(error, errorMsg)
    return undefined
  }
}
