"use server"

// 링크 URL로부터 OpenGraph 태그를 읽어 반환합니다.
export default async function fetchOpenGraph(url: string) {
  const res = await fetch(url)
  if (res.status !== 200) {
    console.error(`failed to fetch data from url included chat message`)
    return null
  }
  return await res.text()
}
