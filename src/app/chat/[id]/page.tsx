import { Box, Stack, Typography } from "@mui/material"
import ChatViewClient from "./_view"
import ChatViewServer from "./_view.server"

/**
 * 전체 채팅방 페이지
 * @server
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default function ChatPage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  return (
    <>
      <ChatViewClient>
        <ChatViewServer id={params.id} />
      </ChatViewClient>
    </>
  )
}
