import { ParsedChatMessage } from "@/types/chat.types"
import { Typography } from "@mui/material"
import GestureDetector from "../client/GestureDetector"

/**
 * 채팅 엔트리의 텍스트 부분을 렌더링합니다
 * 링크의 경우 하이라이팅합니다
 *
 * @export
 * @server
 * @param {{
 *   content: string
 *   parsed: ParsedChatMessage
 * }} {
 *   content,
 *   parsed,
 * }
 * @return {JSX.Element}
 */
export function ChatText({
  content,
  parsed,
}: {
  content: string
  parsed: ParsedChatMessage
}): JSX.Element {
  return (
    <>
      {parsed === null
        ? content // 파싱이 null일 경우 원래 텍스트 렌더링
        : parsed.data.map(({ index, length, type }, idx) => {
            // plain text 또는 link 타입에 따라 렌더링
            const substr = content.substring(index, index + length)
            switch (type) {
              case "link":
                return (
                  <Typography
                    key={idx}
                    sx={{
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    <a href={substr} target='_blank'>
                      {substr}
                    </a>
                  </Typography>
                )
              case "text":
              default:
                return <span key={idx}>{substr}</span>
            }
          })}
    </>
  )
}
