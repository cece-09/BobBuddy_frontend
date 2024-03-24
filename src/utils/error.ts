export class BuddyError extends Error {
  constructor(private readonly code: ErrorCode, message: string) {
    super(message)
  }
}

export enum ErrorCode {
  UNAUTHORIZED_ERROR = "E01",
  NETWORK_ERROR = "E02",
  OAUTH_ERROR = "E03",
  NAVER_MAPS_ERROR = "E04",
  GOOGLE_MAPS_ERROR = "E05",
  GENERAL_LOGIC_ERROR = "E06",
  SIGN_IN_ERROR = "E07",
  SIGN_OUT_ERROR = "E08",
  MATCH_GENERAL_ERROR = "E09",
  THUMBNAIL_ERROR = "E10",
}

const ErrorMsg: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHORIZED_ERROR]: "권한이 없습니다.",
  [ErrorCode.NETWORK_ERROR]: "네트워크 오류가 발생했습니다.",
  [ErrorCode.OAUTH_ERROR]: "OAuth 오류가 발생했습니다.",
  [ErrorCode.NAVER_MAPS_ERROR]: "지도 데이터를 가져오는 데 실패했습니다.",
  [ErrorCode.GOOGLE_MAPS_ERROR]: "지도 데이터를 가져오는 데 실패했습니다.",
  [ErrorCode.GENERAL_LOGIC_ERROR]: "오류가 발생했습니다.",
  [ErrorCode.SIGN_IN_ERROR]: "로그인 중 오류가 발생했습니다.",
  [ErrorCode.SIGN_OUT_ERROR]: "로그아웃 중 오류가 발생했습니다.",
  [ErrorCode.MATCH_GENERAL_ERROR]: "오류가 발생했습니다.",
  [ErrorCode.THUMBNAIL_ERROR]: "링크 썸네일을 가져올 수 없습니다.",
}

export const getErrorCodeMsg = (code: ErrorCode) => ErrorMsg[code]
