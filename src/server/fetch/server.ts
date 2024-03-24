"use server"

import { SeverFetchResponse } from "@/types/server"

export const serverFetch = async (
  route: string,
  init: RequestInit,
): Promise<SeverFetchResponse> => {
  const ret = await fetch(route, init).then(async r => {
    return {
      ok: r.ok,
      status: r.status,
      text: await r.text(),
    }
  })
  console.debug(route, init, ret)
  return ret
}
