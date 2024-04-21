/* eslint-disable no-unused-vars */
import { getServerUri } from '@/server/fetch/request';
import { serverFetch } from '@/server/fetch/server';
import { ErrorResponse } from '@/types/server';
import { isObject } from './common';

export enum ErrorCode {
  UNAUTHORIZED_ERROR = 'E01',
  NETWORK_ERROR = 'E02',
  OAUTH_ERROR = 'E03',
  NAVER_MAPS_ERROR = 'E04',
  GOOGLE_MAPS_ERROR = 'E05',
  GENERAL_LOGIC_ERROR = 'E06',
  SIGN_IN_ERROR = 'E07',
  SIGN_OUT_ERROR = 'E08',
  MATCH_GENERAL_ERROR = 'E09',
  THUMBNAIL_ERROR = 'E10',
  NOT_FOUND_ERROR = 'E11',
  INTERNEL_SERVER_ERROR = 'E12', // 500
  GEOLOCATION_INVALID_ERROR = 'E13',
  GEOLOCATION_PERMISSION_ERROR = 'E14',
}

export class BuddyError extends Error {
  constructor(private readonly _code: ErrorCode, message: string) {
    super(message);
  }
  public get code() {
    return this._code;
  }
}

// error handler
export const handleError = async (
  error: unknown,
  errorMsg?: string,
): Promise<ErrorResponse> => {
  console.error(errorMsg, JSON.stringify(error));
  if (isReportTarget(error)) {
    await reportError(error);
  }

  const errorCode = isBuddyError(error)
    ? error.code
    : ErrorCode.GENERAL_LOGIC_ERROR;

  return {
    result: 'error',
    code: errorCode,
    msg: getErrorCodeMsg(errorCode) + errorMsg,
  };
};

const isReportTarget = (error: unknown): error is BuddyError | TypeError => {
  const isBuddyError = error instanceof BuddyError;
  const isTypeError = error instanceof TypeError;
  return (isBuddyError && REPORT_ERROR.includes(error.code)) || isTypeError;
};

const reportError = async (error: BuddyError | TypeError) => {
  console.log('[REPORT ERROR]', JSON.stringify(error));

  try {
    const body = {
      error: JSON.stringify(error),
      buffer: 'buffer',
    };
    console.log('body', JSON.stringify(body));

    await serverFetch(`${getServerUri()}/error-report`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(`Error reporting failed:`, error);
  }
};

// define if report target
const ErrorMsg: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHORIZED_ERROR]: '권한이 없습니다.',
  [ErrorCode.NETWORK_ERROR]: '네트워크 오류가 발생했습니다.',
  [ErrorCode.OAUTH_ERROR]: 'OAuth 오류가 발생했습니다.',
  [ErrorCode.NAVER_MAPS_ERROR]: '지도 데이터를 가져오는 데 실패했습니다.',
  [ErrorCode.GOOGLE_MAPS_ERROR]: '지도 데이터를 가져오는 데 실패했습니다.',
  [ErrorCode.GENERAL_LOGIC_ERROR]: '오류가 발생했습니다.',
  [ErrorCode.SIGN_IN_ERROR]: '로그인 중 오류가 발생했습니다.',
  [ErrorCode.SIGN_OUT_ERROR]: '로그아웃 중 오류가 발생했습니다.',
  [ErrorCode.MATCH_GENERAL_ERROR]: '오류가 발생했습니다.',
  [ErrorCode.THUMBNAIL_ERROR]: '링크 썸네일을 가져올 수 없습니다.',
  [ErrorCode.NOT_FOUND_ERROR]: '페이지를 찾을 수 없습니다.',
  [ErrorCode.INTERNEL_SERVER_ERROR]: '서버 오류가 발생했습니다.',
  [ErrorCode.GEOLOCATION_INVALID_ERROR]:
    '위치 정보를 가져오는 데 실패했습니다.',
  [ErrorCode.GEOLOCATION_PERMISSION_ERROR]:
    '위치 정보를 가져오는 데 실패했습니다.',
};

const REPORT_ERROR: ErrorCode[] = [
  ErrorCode.NAVER_MAPS_ERROR,
  ErrorCode.GOOGLE_MAPS_ERROR,
  ErrorCode.GENERAL_LOGIC_ERROR,

  ErrorCode.THUMBNAIL_ERROR,
];

export const getErrorCodeMsg = (code: ErrorCode) => ErrorMsg[code];

// type guard
export const isBuddyError = (error: unknown): error is BuddyError => {
  if (!isObject(error) || !error.hasOwnProperty('code')) {
    return false;
  }
  const code = (error as BuddyError).code;
  return code !== undefined && code in ErrorCode;
};

export const isErrorResponse = (response: unknown): response is ErrorResponse =>
  isObject(response) &&
  response.hasOwnProperty('result') &&
  response.hasOwnProperty('code') &&
  response.hasOwnProperty('msg');
