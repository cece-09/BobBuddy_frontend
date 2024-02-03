import ChatRoomUI, { ChatRoomProps } from "@/components/chat/client/ChatRoom"
import ChatList from "@/components/chat/server/ChatList"
import { getChatRoom } from "@/server-actions/chat.actions"
import { ChatUser } from "@/types/chat.types"

/**
 * 개별 채팅방 페이지
 * 초기 데이터 페칭을 여기서 합니다.
 * @server
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default async function ChatPage({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> {
  const chatroom = await getChatRoom(params.id)
  const room: ChatRoomProps = {
    name: "",
    time: "",
    jsonNotice: JSON.stringify(chatroom.notice),
    jsonUsers: JSON.stringify(chatroom.users),
    currPage: chatroom.chats.at(-1)!.page,
    children: undefined,
  }
  const users: { [key: string]: ChatUser } = {}
  chatroom.users.forEach(user => (users[user.id] = user))
  users[chatroom.userId].currUser = true // 로그인된 유저 마크

  return (
    <>
      <ChatRoomUI {...room}>
        {chatroom.chats.map(({ page, data }) => (
          <ChatList key={page} chats={data} users={users} />
        ))}
      </ChatRoomUI>
    </>
  )
}
