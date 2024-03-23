import { MatchRequest } from "@/types/server"
import request from "./fetch/request"
import { jsonifyResponse } from "@/utils/server"

export const requestMatch = async (body: MatchRequest): Promise<any> => {
  try {
    const result = await request("/match", {
      method: "PUT",
    }).then(r => {
      return jsonifyResponse<any>(r)
    })
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}
