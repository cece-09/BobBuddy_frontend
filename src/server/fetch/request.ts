import {
  ClientFetchReponse,
  FetchResponse,
  SeverFetchResponse,
} from '@/types/server';
import { serverFetch } from './server';
import { clientFetch } from './client';
import { getAccessToken } from '@/utils/server';
import { BuddyError, ErrorCode } from '@/utils/error';

const DEFAULT_HEADER: HeadersInit = {
  'Content-Type': 'application/json',
};

const PUBLIC_REQUEST_PREFIX = ['/user/signup', '/auth/sign-in'];

const isPublic = (uri: string) =>
  PUBLIC_REQUEST_PREFIX.findIndex(prefix => uri.includes(prefix)) > 0;

const request = async (
  uri: string,
  init: RequestInit,
): Promise<FetchResponse> => {
  const prefix = getServerUri();
  const isPublicRequest = isPublic(uri);
  const token = !isPublicRequest ? getAccessToken() : undefined;

  const newInit: RequestInit = (() => {
    const newHeader: HeadersInit = token
      ? {
          ...DEFAULT_HEADER,
          Authorization: `Bearer ${token}`,
        }
      : DEFAULT_HEADER;
    return { ...init, headers: { ...init.headers, ...newHeader } };
  })();

  const requesetUri: string = prefix + uri;
  console.debug(`[${init.method}] ${requesetUri}`);

  if (process.env.NODE_ENV === 'development') {
    const result: SeverFetchResponse = await serverFetch(requesetUri, newInit);
    return {
      ...result,
      json: () => (result.text ? JSON.parse(result.text) : undefined),
    };
  } else {
    const result: ClientFetchReponse = await clientFetch(requesetUri, newInit);
    return result;
  }
};

export default request;

export const getServerUri = (): string => {
  const REMOTE_URI = process.env.NEXT_PUBLIC_SERVER_URI;
  return REMOTE_URI!;
};

export const getNextUri = (): string => {
  return `http://localhost:3000`;
};
