'use server';

import { TextQueryResult } from '@/types/home.types';

export async function reverseGeocoding(longitude: number, latitude: number) {
  const SERVER_URI = process.env.NEXT_PUBLIC_NAVER_MAP_API;
  const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET;
  // 쿼리 파라미터
  const queryString = new URLSearchParams({
    coords: `${longitude},${latitude}`,
    output: 'json',
  }).toString();
  // NCLOUD 등록된 어플리케이션 ID/KEY
  const headers: Record<string, string> = {
    'X-NCP-APIGW-API-KEY-ID': CLIENT_ID as string,
    'X-NCP-APIGW-API-KEY': CLIENT_SECRET as string,
  };

  const res = await fetch(`${SERVER_URI}?${queryString}`, {
    method: 'GET',
    headers: headers,
  });

  if (res.status === 200) {
    const json = await res.json();
    let addrString = '';
    const results: ReverseGeoResult[] = json['results'];
    const { region } = results[0];
    // TODO: use reduce method
    Object.keys(region).forEach((key, idx) => {
      if (key === 'area0') return;
      if (idx === Object.keys(region).length - 1) {
        addrString += region[key].name;
      } else {
        addrString += region[key].name + ' ';
      }
    });
    addrString.trim();
    return addrString;
  } else {
    return null;
  }
}

type ReverseGeoResult = {
  name: string;
  code: {
    id: string;
    type: string;
    mappingId: string;
  };
  region: {
    [key: string]: {
      name: string;
      coords: {
        center: {
          crs: string;
          x: number;
          y: number;
        };
      };
    };
  };
};

/**
 *
 *
 * @export
 * @param {string} keyword
 * @return {*}  {Promise<TextQueryResult>}
 */
export async function getAddrByKeyword(
  keyword: string,
): Promise<TextQueryResult[]> {
  // API URI
  const API_URI = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  // 요청 헤더
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress',
  };
  // 요청 바디
  const body = {
    textQuery: keyword.trim(),
    languageCode: 'ko',
    maxResultCount: 5,
    locationRestriction: {
      // 서울특별시로 제한
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
    },
  };

  const res = await fetch(`${API_URI}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });
  if (res.status === 200) {
    const json = await res.json();
    const results: TextQueryResult[] = json['places'];
    console.log(results);
    return results;
  }
  return [];
}
