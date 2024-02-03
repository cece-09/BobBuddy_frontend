"use server"

export default async function reverseGeocoding(
  longitude: number,
  latitude: number,
) {
  const SERVER_URI = process.env.NEXT_PUBLIC_NAVER_MAP_API
  const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET
  // 쿼리 파라미터
  const queryString = new URLSearchParams({
    coords: `${longitude},${latitude}`,
    output: "json",
  }).toString()
  // NCLOUD 등록된 어플리케이션 ID/KEY
  const headers: Record<string, string> = {
    "X-NCP-APIGW-API-KEY-ID": CLIENT_ID as string,
    "X-NCP-APIGW-API-KEY": CLIENT_SECRET as string,
  }

  const res = await fetch(`${SERVER_URI}?${queryString}`, {
    method: "GET",
    headers: headers,
  })

  if (res.status === 200) {
    const json = await res.json()
    let addrString = ""
    const results: ReverseGeoResult[] = json["results"]
    const { region } = results[0]
    Object.keys(region).forEach((key, idx) => {
      if (key === "area0") return
      if (idx === Object.keys(region).length - 1) {
        addrString += region[key].name
      } else {
        addrString += region[key].name + " "
      }
    })
    addrString.trim()
    return addrString
  } else {
    return null
  }
}

type ReverseGeoResult = {
  name: string
  code: {
    id: string
    type: string
    mappingId: string
  }
  region: {
    [key: string]: {
      name: string
      coords: {
        center: {
          crs: string
          x: number
          y: number
        }
      }
    }
  }
}
