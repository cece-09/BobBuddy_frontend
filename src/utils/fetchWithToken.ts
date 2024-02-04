function getBrowserToken(): string | null {
  const cookieStrList = document.cookie.split(";")
  for (const str of cookieStrList) {
    const [key, value] = str.split("=").map(each => each.trim())
    if (key === "token") {
      return value
    }
  }
  return null
}

/**
 * 쿠키에서 토큰을 조회하고
 * 기본 Authentication Header를 세팅하여
 * 파라미터로 전달된 route와 requestInit으로
 * 요청 객체 생성, fetch합니다
 *
 * @param {string} route       요청 리소스 경로
 * @param {RequestInit} [init] 요청 옵션, optional
 * @return {Promise<Response>}
 *
 * @usage
 * ```js
 * const res = await fetchWithToken('/match', {
 *  method: 'POST',
 *  // ... extra settings
 * })
 * ```
 */
export async function fetchWithToken(
  route: string,
  init?: RequestInit,
): Promise<Response> {
  const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI
  // TODO: remove test code
  //   document.cookie = `token=jsontokenstring;max-age=${3600};path=/`
  const token = getBrowserToken()
  if (token === null) {
    // TODO: 토큰이 없는 경우 예외처리
    window.location.href = "/"
  }
  const requestInits: RequestInit = {
    headers: {
      Authorization: `${token}`,
      ...init?.headers,
    },
    ...init,
  }
  return fetch(`${SERVER_URI}${route}`, requestInits)
}
