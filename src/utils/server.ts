import { BaseResponse, FetchResponse } from "@/types/server"

export const jsonifyResponse = async <T>(
  response: FetchResponse,
  errorMsg?: string,
): Promise<T> => {
  if (response.ok) {
    return response.json()
  }

  const data: BaseResponse = await response.json()
  const message =
    data.code === undefined
      ? errorMsg ?? `Cannot find error code`
      : `${data.code}: ${data.msg}`

  throw new Error(message)
}
