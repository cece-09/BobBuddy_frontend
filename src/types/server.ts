/* eslint-disable no-unused-vars */
import { ErrorCode } from '@/utils/error';
import { Language, LatLng } from './common';

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
  KAKAO = 'kakao',
  NAVER = 'naver',
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
  matchSize: string;
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

enum RegionType {
  area0 = 'area0',
  area1 = 'area1',
  area2 = 'area2',
  area3 = 'area3',
  area4 = 'area4',
}

export interface ReverseGeoResult {
  name: string;
  code: {
    id: string;
    type: string;
    mappingId: string;
  };
  region: Record<
    RegionType,
    {
      name: string;
      coords: {
        center: {
          // "crs": "EPSG:4326",
          x: number;
          y: number;
        };
      };
    }
  >;
}

export interface ReverseGeoResponse {
  results: ReverseGeoResult[];
}

export interface QueryAddressRequest {
  textQuery: string;
  languageCode: Language;
  maxResultCount: number;
  locationRestriction: {
    rectangle: {
      low: LatLng;
      high: LatLng;
    };
  };
}

export type QueryAddressResult = {
  formattedAddress: string;
  displayName: {
    text: string;
  };
};

export interface QueryAddressResponse {
  places: QueryAddressResult[];
}
