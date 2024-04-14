import { ErrorCode } from '@/utils/error';

export interface FetchResponse {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
}

export interface SeverFetchResponse {
  ok: boolean;
  status: number;
  text: string | undefined;
}

export interface ClientFetchReponse {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
}

export type BaseResponse = {
  code: string;
  msg: string;
};

export enum OAuthProvider {
  kakao = 'kakao',
  naver = 'naver',
}

export interface SignInRequest {
  userEmail: string;
  pwd: string;
}

export interface SignInResponse extends BaseResponse {
  token?: string;
}

export interface SignUpRequest {
  userEmail: string;
  userName: string;
  pwd: string;
}

export interface MatchRequest {
  location: string;
}

export interface UserInfoResponse {
  provider: string; // TODO: make enum type
  name: string;
  email: string;
}

export interface UserUpdateRequest {
  userName: string;
  gender: string;
}

export interface UserUpdateResponse {
  userName: string;
  gender: string;
}

export interface ErrorResponse extends BaseResponse {
  code: ErrorCode;
  result: 'error';
}

export type MatchResponse = { result: 'success' } | ErrorResponse;
