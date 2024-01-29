"use server"

// 링크 URL로부터 HTML문서를 읽어옵니다
export default async function fetchHTMLFromURL(url: string) {
  const res = await fetch(url)
  if (res.status !== 200) {
    console.error(`failed to fetch data from url included chat message`)
    return null
  }
  return await res.text()
}
