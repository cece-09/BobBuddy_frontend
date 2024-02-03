import { Box, Typography, Stack } from "@mui/material"
import ProfilePic from "../../common/ProfilePic"
import ChatLinkThumb from "../client/ChatLinkThumb"
import { ChatText } from "./ChatText"
import {
  CHAT_SHOW_TIME,
  CHAT_SHOW_USER,
  CHAT_SHOW_MINE,
} from "../../../constants/chat.constants"
import ChatShowOptionModal from "../client/ChatOptionModal"
import { parseChatLinks } from "@/utils/chat.utils"
import { ChatUser } from "@/types/chat.types"

/**
 * 하나의 채팅 엔트리를 렌더링하는 레이아웃 컴포넌트
 * 매개변수로 전달받은 옵션에 따라 조건부로
 * 유저 프로필, 이름, 발송 시각 및
 * 링크를 포함하는 경우 썸네일을 렌더링합니다
 *
 * @export
 * @server
 * @param {{
 *   content: string
 *   timestamp: number
 *   user: ChatUser
 *   options?: number
 * }} {
 *   content,
 *   timestamp,
 *   user,
 *   options = CHAT_SHOW_TIME | CHAT_SHOW_USER,
 * }
 * @return {JSX.Element}
 */
export default function ChatEntry({
  chatId,
  user,
  content,
  timestamp,
  options = CHAT_SHOW_TIME | CHAT_SHOW_USER,
}: {
  chatId: string
  user: ChatUser
  content: string
  timestamp: number
  options?: number
}): JSX.Element {
  // 텍스트 파싱
  const parsed = parseChatLinks(content)

  // 타임스탬프 포매터 함수
  const formatter = (timestamp: number) => {
    const date = new Date(timestamp)
    let hh: number | string = date.getHours()
    let mm: number | string = date.getMinutes()
    let ee = hh > 12 ? "오후" : "오전"
    hh = hh > 12 ? hh - 12 : hh
    hh = hh.toString().padStart(2, "0")
    mm = mm.toString().padStart(2, "0")
    return `${ee} ${hh}:${mm}`
  }

  // 조건부 렌더링: 프로필 이미지
  const profileImg =
    options & CHAT_SHOW_MINE ? (
      <></>
    ) : options & CHAT_SHOW_USER ? (
      <ProfilePic src={user.profile} width={40} height={40} />
    ) : (
      <Box width={40} height={40} />
    )
  // 조건부 렌더링: 유저 이름
  const username =
    options & CHAT_SHOW_USER && !(options & CHAT_SHOW_MINE) ? (
      <Typography sx={{ fontSize: "0.9rem" }}>
        {user.name ?? "user name"}
      </Typography>
    ) : (
      <></>
    )
  // 조건부 렌더링: 발송 시간
  const sentTime =
    options & CHAT_SHOW_TIME && parsed.thumb === null ? (
      <Typography
        sx={{
          color: "#444",
          fontSize: "0.8rem",
          alignSelf: "end",
        }}
      >
        {formatter(timestamp)}
      </Typography>
    ) : (
      <></>
    )
  // 조건부 렌더링: 링크 썸네일
  const thumbnail =
    parsed.thumb !== null ? (
      <Stack
        direction={options & CHAT_SHOW_MINE ? "row-reverse" : "row"}
        gap='0.5rem'
      >
        <ChatLinkThumb url={parsed.thumb} />
        {sentTime}
      </Stack>
    ) : (
      <></>
    )

  return (
    <Stack
      direction='row'
      alignItems='start'
      gap='0.5rem'
      justifyContent={options & CHAT_SHOW_MINE ? "end" : "start"}
      width='100%'
      padding='0.5rem 0rem'
    >
      {profileImg}
      <Stack
        direction='column'
        gap='0rem'
        alignItems={options & CHAT_SHOW_MINE ? "end" : "start"}
      >
        {username}
        <Stack
          direction={options & CHAT_SHOW_MINE ? "row-reverse" : "row"}
          width='100%'
          gap='0.5rem'
          marginBottom='0.5rem'
        >
          <Box
            sx={{
              maxWidth: "60vw",
              wordWrap: "break-word",
              borderRadius: "0.5rem",
              backgroundColor: options & CHAT_SHOW_MINE ? "yellow" : "white",
              padding: "0.5rem 0.8rem",
            }}
          >
            <ChatShowOptionModal {...{ chatId, content, options }}>
              <ChatText {...{ content, parsed }} />
            </ChatShowOptionModal>
          </Box>
          {sentTime}
        </Stack>
        {thumbnail}
      </Stack>
    </Stack>
  )
}
