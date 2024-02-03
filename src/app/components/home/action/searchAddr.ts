// TODO: type으로 옮기기

export type TextQueryResult = {
  formattedAddress: string
  displayName: {
    text: string
  }
}

/**
 *
 *
 * @export
 * @param {string} keyword
 * @return {*}  {Promise<TextQueryResult>}
 */
export default async function getAddrByKeyword(
  keyword: string,
): Promise<TextQueryResult[]> {
  // API URI
  const API_URI = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string
  // 요청 헤더
  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
  }
  // 요청 바디
  const body = {
    textQuery: keyword.trim(),
    languageCode: "ko",
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
  }

  const res = await fetch(`${API_URI}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
  if (res.status === 200) {
    const json = await res.json()
    const results: TextQueryResult[] = json["places"]
    console.log(results)
    return results
  }
  return []
}

type SearchAddrResult = {
  common: {
    totalCount: string
    currentPage: number
    countPerPage: number
    errorCode: string
    errorMessage: string
  }
  juso: {
    roadAddr: string
    roadAddrPart1: string
    roadAddrPart2?: string
    jibunAddr: string
    engAddr: string
    zipNo: string
    admCd: string
    rnMgtSn: string
    bdMgtSn: string
    detBdNmList?: string
    bdNm?: string
    bdKdcd: string
    siNm: string
    sggNm: string
    emdNm: string
    liNm?: string
    rn: string
  }
}
