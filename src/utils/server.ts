import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_MAX_AGE } from '@/constants/server';
import { FetchResponse } from '@/types/server';
import { BuddyError, ErrorCode, getErrorCodeMsg } from './error';

export const jsonifyResponse = async <T>(
  response: FetchResponse,
  errorCode: ErrorCode,
): Promise<T> => {
  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    const errorCode = ErrorCode.UNAUTHORIZED_ERROR;
    throw new BuddyError(errorCode, getErrorCodeMsg(errorCode));
  }

  const data = await response.json();
  const message = getErrorCodeMsg(errorCode) + `[RES: ${JSON.stringify(data)}]`;

  throw new BuddyError(errorCode, message);
};

export const getAccessToken = (): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${ACCESS_TOKEN_KEY}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(`;`).shift();
  }
  return undefined;
};

export const setAccessToken = (token: string): void => {
  document.cookie = `${ACCESS_TOKEN_KEY}=${token};max-age=${ACCESS_TOKEN_MAX_AGE}`;
};

export const removeAccessToken = (): void => {
  document.cookie = `${ACCESS_TOKEN_KEY}=;max-age=-1`;
};
