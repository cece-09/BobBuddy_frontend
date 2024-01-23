import { Chat } from "@/model/chat.model"
import { Paged } from "@/model/paged.model"
import { Box, Stack } from "@mui/material"
import ChatMessage from "./_message"

/**
 * Server-Side Function
 * 채팅방 아이디를 인자로 받아
 * 해당 채팅방의 최근 채팅 목록을 가져옵니다
 * @param chatId
 * @returns
 */
async function getChats(chatId: string): Promise<Paged<Chat>> {
  //   const res = await fetch(`${process.env.SERVER_URI}/chat/${chatId}`)
  //   const json = await res.json()
  //   return Paged.fromJson<Chat>(json)
  const dummy: Paged<Chat> = {
    page: 1,
    size: 100,
    totalPage: 1,
    totalCount: 5,
    data: [],
  }

  dummy.data = []
  const now = new Date()
  dummy.data.push(new Chat("1", "1", "hello", now.toISOString(), false))
  dummy.data.push(new Chat("1", "2", "hey", now.toISOString(), false))
  dummy.data.push(new Chat("2", "3", "hola", now.toISOString(), false))
  dummy.data.push(new Chat("1", "4", "안녕", now.toISOString(), false))

  return dummy
}

/**
 * 메시지 목록을 제공하는 채팅방 화면
 *
 * @server
 * @param {{ id: string }} { id }
 * @return {*}
 */
export default async function ChatViewServer({ id }: { id: string }) {
  const chat: Paged<Chat> = await getChats(id)
  return (
    <>
      {chat.data.map(c => {
        const date: Date = new Date(c.timestamp)

        return (
          <Stack
            key={c.chatId}
            direction='row'
            alignItems='end'
            gap='0.5rem'
            sx={{ width: "100%", padding: "0.5rem 0rem" }}
          >
            <Box
              sx={{
                borderRadius: "0.5rem",
                backgroundColor: "#eee",
                padding: "0.5rem 0.8rem",
              }}
            >
              {c.message}
            </Box>

            <Box
              sx={{
                color: "#444",
                fontSize: "0.9rem",
              }}
            >
              {date.getHours()}:{date.getMinutes()}
            </Box>
          </Stack>
        )
      })}
    </>
  )
}
