import { OpenGraph } from "@/types/chat.types"

/**
 * text로부터 open graph 태그를 찾아
 * 객체 타입으로 반환합니다.
 * @export
 * @param {string} text
 * @return {*}  {OpenGraph}
 */
export default function findOpenGraph(text: string): OpenGraph {
  // 최대 반복문 횟수
  let REPEAT_THERESHOLD = 100

  // 전체 문서에서 검색 범위 설정합니다.
  let headStart = text.indexOf("<meta")
  let headEnd = text.indexOf("/head>")
  if (headStart < 0 || headEnd < 0) {
    throw new Error("failed to find <meta> tag")
  }

  // head 태그부터 og:로 시작하는 오픈그래프 메타 태그를 찾습니다.
  let start = text.indexOf(`og:`, headStart)
  let end = start < 0 ? -1 : text.indexOf(">", start)

  // 반복문 내부에서 기록할 객체
  const metadata: { [key: string]: string | null } = {
    title: null,
    image: null,
    description: null,
  }

  // 반복문을 돌면서 open graph 속성을 찾습니다.
  while (start >= 0 && end >= 0 && start < headEnd && REPEAT_THERESHOLD) {
    // 프로퍼티 분류, content 찾기
    let key,
      content,
      propend,
      propstart = start

    // 다음 값 갱신
    start = text.indexOf("og:", end + 1)
    end = start < 0 ? -1 : text.indexOf(">", start)
    REPEAT_THERESHOLD -= 1

    if ((propend = text.indexOf(" ", propstart)) === null) {
      // 잘못된 형식: 이후 검색된 공백문자가 없습니다.
      break
    }

    key = text.substring(propstart + 3, propend - 1)

    if (
      !Object.keys(metadata).includes(key) ||
      (content = text.indexOf("content", propstart)) < 0
    ) {
      // title, image, description이 아니면 패스합니다.
      // content 속성이 없을 경우 패스합니다.
      continue
    }

    const strnotation = text[content + 8]
    if ((propend = text.indexOf(strnotation, content + 9)) === null) {
      // 잘못된 형식: content= 필드의 종료 문자열 기호가 없습니다
      break
    }

    let value = text.substring(content + 9, propend)
    metadata[key] = value
  }

  // title, image 는 필수 필드입니다.
  if (metadata.title === null || metadata.image === null) {
    throw new Error("can't find title tag.")
  }

  return {
    title: metadata.title,
    image: metadata.image,
    descr: metadata.description,
  } as OpenGraph
}
