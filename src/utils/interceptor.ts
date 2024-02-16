import { serverFetch } from "./serverFetch"

/**
 * 응답을 인터셉트하는 함수를 인자로 받아
 * 응답 바디를 리턴하기 전 실행합니다.
 * 만약 실행 환경이 개발환경이라면 서버 액션을 실행해
 * CORS 오류를 방지합니다.
 *
 * @client
 * @template T 타입의 응답을 처리합니다
 * @param {ResponseInterceptor<T>} [responseInterceptor] 응답 수신 시 콜백함수 (optional)
 * @return {(options: FetchOptions) => Promise<T>}
 *
 * @usage
 * ```js
 * // interceptor 객체 생성. 응답 수신 후 saveAccessToken 로직 실행
 * const interceptor = createInterceptor<SigninRes>(saveAccessToken);
 *
 * // fetch 함수와 동일하게 응답 받아옴
 * const response = await interceptor({
 *   url: '/sign-in',
 *   method: 'POST',
 *   headers: {
 *      'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *      userEmail: email,
 *      pwd: password,
 *   }),
 * });
 *
 * // 서버 측에서 명시적으로 전달해주는 body 내 code 필드로 유효성 검사
 * if(response.code === 'SUCCESS') {
 *      console.log('successfully signed in!');
 *      window.location.href = '/home';
 * } else {
 *      alert('failed to sign in!');
 * }
 */
export function createInterceptor<T>(
  responseInterceptor?: ResponseInterceptor<T>,
): (options: FetchOptions) => Promise<T> {
  return async (options: FetchOptions): Promise<T> => {
    const { url, ...fetchOptions } = options

    // 디버깅 환경일 경우 요청 로깅합니다.
    if (process.env.NODE_ENV === "development") {
      console.log(`${fetchOptions.method} ${url}`)
    }

    // 요청 URI가 회원가입 혹은 로그인 관련이 아닐 경우
    // 쿠키에서 토큰 정보를 찾아 헤더에 세팅합니다.
    let headers = new Headers(fetchOptions.headers)
    if (!url.includes("auth") && !url.includes("signup")) {
      let token
      if (!(token = getAccessToken())) {
        // 토큰이 없는 경우에는 null이 세팅되고, 이 경우
        // 서버로 요청을 보내지 않고 No Permission 응답 객체를 반환합니다.
        return { code: "NP", msg: "No Permission" } as T
      }
      headers.append("Authorization", token)
    }

    const updatedOptions = {
      ...fetchOptions,
      headers,
    }

    let data: T
    let updatedUri = url
    const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI!
    if (!url.includes(SERVER_URI)) updatedUri = `${SERVER_URI}${url}`

    if (process.env.NODE_ENV === "development") {
      // 개발환경일 경우 server action으로 CORS 우회합니다.
      console.log(
        updatedUri,
        updatedOptions,
        updatedOptions.headers.get("Authorization"),
      )
      data = await serverFetch(updatedUri, updatedOptions)
    } else {
      // production 환경에서는 클라이언트에서 바로 요청합니다.
      const response = await fetch(updatedUri, updatedOptions)
      data = await response.json()
    }

    // 응답 인터셉트 함수를 실행합니다.
    if (responseInterceptor) {
      return responseInterceptor(data)
    }
    return data
  }
}

/**
 * 만약 응답 객체의 body로 token 필드가 있다면
 * 쿠키에 저장합니다. 인터셉터의 인자로 전달 가능합니다.
 * @param data
 * @returns data
 */
export const saveAccessToken: ResponseInterceptor<any> = (data: any) => {
  if (data && typeof data === "object" && Object.keys(data).includes("token")) {
    document.cookie = `token=${data.token};max-age=${data.maxAge}`
  }
  return data
}

/**
 * 쿠키로부터 액세스 토큰을 읽어옵니다
 * @returns token or null
 */
export const getAccessToken = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; token=`)
  if (parts.length === 2) {
    return parts.pop()?.split(`;`).shift()
  }
  return null
}

// Fetch Option Type
export interface FetchOptions extends RequestInit {
  url: string
}

// Response Interceptor Type
export interface ResponseInterceptor<T> {
  (response: T): T | Promise<T>
}

// TODO: 이걸 extend해서 응답 형식을 구조화하면 좋을듯
export interface BaseResponse {
  code: string
  msg: string
}
