"use server"

/**
 * 개발환경에서 CORS에러 방지를 위해
 * 서버 액션으로 우회합니다.
 *
 * @export
 * @param {string} route
 * @param {string} [init]
 * @return {*}  {Promise<Response>}
 */
export async function serverFetch(
  route: string,
  init: RequestInit,
): Promise<any> {
  const response = await fetch(route, init)
  return await response.json()
}
