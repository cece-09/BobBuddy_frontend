import {
  ClientFetchReponse,
  FetchResponse,
  SeverFetchResponse,
} from '@/types/server';
import { BuddyError, ErrorCode } from '@/utils/error';
import { getAccessToken } from '@/utils/server';
import { clientFetch } from './client';
import { serverFetch } from './server';

const DEFAULT_HEADER: HeadersInit = {
  'Content-Type': 'application/json',
};

const PUBLIC_REQUEST_PREFIX = ['/user/signup', '/auth/sign-in'];

const isPublic = (uri: string) =>
  PUBLIC_REQUEST_PREFIX.findIndex(prefix => uri.includes(prefix)) > 0;

const request = async (
  uri: string,
  init: RequestInit & {
    prefix?: string;
    useServer?: boolean;
    auth?: boolean;
  },
): Promise<FetchResponse> => {
  const prefix = init.prefix ?? getServerUri();
  const isPublicRequest = isPublic(uri);
  const token = !isPublicRequest ? getAccessToken() : undefined;

  const newInit: RequestInit = (() => {
    const newHeader: HeadersInit =
      token === undefined || init.auth === false
        ? DEFAULT_HEADER
        : {
            ...DEFAULT_HEADER,
            Authorization: `Bearer ${token}`,
          };

    return { ...init, headers: { ...init.headers, ...newHeader } };
  })();

  const requesetUri: string = prefix + uri;
  console.debug(`[${init.method}] ${requesetUri}`);

  const getTimeoutPromise = <T>() =>
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new BuddyError(ErrorCode.NETWORK_ERROR, 'Request timeout'));
      }, 5000);
    });

  if (process.env.NODE_ENV === 'development') {
    const result: SeverFetchResponse = await Promise.race([
      serverFetch(requesetUri, newInit),
      getTimeoutPromise<SeverFetchResponse>(),
    ]);
    return {
      json: () => (result.text ? JSON.parse(result.text) : undefined),
      ...result,
    };
  } else {
    const result: ClientFetchReponse = await Promise.race([
      clientFetch(requesetUri, newInit),
      getTimeoutPromise<ClientFetchReponse>(),
    ]);
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
