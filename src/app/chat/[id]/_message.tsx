import { ChatUser } from "@/model/chat.model"
import { Box, Stack, Typography } from "@mui/material"
import Image from "next/image"

interface ChatMessageProps {
  user: ChatUser | null
  content: string
  time: string
  prevGap: number | null
  prevUserId: string | null
}

/**
 * 개별 채팅 메시지 컴포넌트
 * user 필드가 null인 경우 내가 보낸 메시지로 처리
 * 추후 유저정보 접근 가능할 경우 수정예정 // TODO
 *
 * @export
 * @param {ChatMessageProps} {
 *   user,
 *   time,
 *   content,
 *   prevGap,
 *   prevUserId,
 * }
 * @return {*}  {JSX.Element}
 */
export default function ChatMessage({
  user,
  time,
  content,
  prevGap,
  prevUserId,
}: ChatMessageProps): JSX.Element {
  // 이전 채팅 메시지와 작성자가 같고
  // 타임스탬프가 60초 미만 차이라면
  // 프로필사진, 유저이름을 생략하여 보여줍니다.
  const FOLDABLE_GAP = 60
  const isMine = user === null // TODO: 유저 아이디로 내 채팅인지 확인
  const isFoldable =
    prevGap !== null && prevGap < FOLDABLE_GAP && user?.id === prevUserId

  return (
    <>
      <Stack
        direction='row'
        alignItems='start'
        gap='0.5rem'
        justifyContent={isMine ? "end" : "start"}
        sx={{ width: "100%", padding: "0.5rem 0rem" }}
      >
        {isMine ? (
          <></>
        ) : isFoldable ? (
          <Box width={40} height={40} />
        ) : (
          <Image src={user.profile} alt='profile' width={40} height={40} />
        )}
        <Stack direction='column' gap='0rem'>
          {isFoldable || isMine ? (
            <></>
          ) : (
            <Typography sx={{ fontSize: "0.9rem" }}>
              {user.name ?? "user name"}
            </Typography>
          )}
          <Stack
            direction={isMine ? "row-reverse" : "row"}
            width='100%'
            gap='0.5rem'
          >
            <Box
              sx={{
                borderRadius: "0.5rem",
                backgroundColor: isMine ? "yellow" : "#eee",
                padding: "0.5rem 0.8rem",
              }}
            >
              {content}
            </Box>
            <Typography
              sx={{
                color: "#444",
                fontSize: "0.9rem",
                alignSelf: "end",
              }}
            >
              {time}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
