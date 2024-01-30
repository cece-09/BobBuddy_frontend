import { ParsedChatMessage } from "@/types/chat.types"

export default function parseChatLinks(str: string): ParsedChatMessage {
  let start,
    end = 0
  const prefix = "https://"
  if ((start = str.indexOf(prefix)) < 0) {
    // str에서 링크를 찾을 수 없습니다
    return {
      thumb: null,
      data: [{ index: 0, length: str.length, type: "text" }],
    }
  }

  const strs = { thumb: null, data: [] } as ParsedChatMessage

  while (start >= 0 && end >= 0 && start < str.length && end < str.length) {
    if (start > 0) {
      // 이전 문자열 정보를 저장합니다.
      strs.data.push({ index: end, length: start - end, type: "text" })
    }
    if ((end = str.indexOf(" ", start)) < 0) {
      // 링크 문자열이 전체 문자열의 마지막에 위치합니다.
      end = str.length + 1
    }
    strs.data.push({ index: start, length: end - start, type: "link" })
    if (strs.thumb === null) {
      // 썸네일 렌더링에 사용할 링크를 저장합니다.
      strs.thumb = str.substring(start, end)
    }
    start = str.indexOf(prefix, end + 1)
  }

  if (end !== str.length + 1) {
    // 마지막 텍스트 문자열 처리
    strs.data.push({ index: end, length: str.length - end, type: "text" })
  }
  return strs
}
