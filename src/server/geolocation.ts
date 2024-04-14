import { Address, Language } from '@/types/common';
import {
  QueryAddressRequest,
  QueryAddressResponse,
  ReverseGeoResponse,
} from '@/types/server';
import { BuddyError, ErrorCode, handleError } from '@/utils/error';
import { getAddressString, jsonifyResponse } from '@/utils/server';
import request from './fetch/request';

const DEFAULT_QUERY_LANG = Language.KOREAN;
const MAX_QUERY_LENGTH = 5;
const LOCATION_RESTRICTION = {
  rectangle: {
    low: {
      latitude: 37.413294,
      longitude: 126.734086,
    },
    high: {
      latitude: 37.715133,
      longitude: 127.269311,
    },
  },
};

export const requestReverseGeo = async (
  longitude: number,
  latitude: number,
): Promise<Address | undefined> => {
  const queryString = new URLSearchParams({
    coords: `${longitude},${latitude}`,
    output: 'json',
  }).toString();

  try {
    const SERVER_URI = process.env.NEXT_PUBLIC_NAVER_MAP_API;
    const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET;
    if (
      SERVER_URI === undefined ||
      CLIENT_ID === undefined ||
      CLIENT_SECRET === undefined
    ) {
      throw new BuddyError(ErrorCode.NAVER_MAPS_ERROR, 'No env variables');
    }

    const headers: Record<string, string> = {
      'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
      'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
    };

    const result: ReverseGeoResponse = await request(`?${queryString}`, {
      method: 'GET',
      headers: headers,
      prefix: SERVER_URI,
      useServer: true,
    }).then(r =>
      jsonifyResponse<ReverseGeoResponse>(r, ErrorCode.NAVER_MAPS_ERROR),
    );

    if (result.results.length === 0) {
      throw new BuddyError(ErrorCode.NAVER_MAPS_ERROR, 'No results');
    }

    const { region } = result.results[0];
    const address = getAddressString(region);

    return {
      latitude,
      longitude,
      address,
    };
  } catch (error) {
    const erroMsg = `request reverse geocoding fail`;
    await handleError(error, erroMsg);
    return undefined;
  }
};

export const requestQueryAddress = async (
  keyword: string,
): Promise<Address[] | undefined> => {
  const body: QueryAddressRequest = {
    textQuery: keyword.trim(),
    languageCode: DEFAULT_QUERY_LANG,
    maxResultCount: MAX_QUERY_LENGTH,
    locationRestriction: LOCATION_RESTRICTION,
  };

  try {
    const API_URI = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (API_URI === undefined || API_KEY === undefined) {
      throw new BuddyError(ErrorCode.GOOGLE_MAPS_ERROR, 'No env variables');
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
    };

    const result: QueryAddressResponse = await request('', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      auth: false,
      prefix: API_URI,
      useServer: true,
    }).then(r =>
      jsonifyResponse<QueryAddressResponse>(r, ErrorCode.GOOGLE_MAPS_ERROR),
    );

    return result.places.map(place => ({
      latitude: 0,
      longitude: 0,
      address: place.formattedAddress,
      name: place.displayName.text,
    }));
  } catch (error) {
    const errorMsg = `request query address fail`;
    await handleError(error, errorMsg);
    return undefined;
  }
};
