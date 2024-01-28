import ChatRoomUI, {
  ChatRoomProps,
} from "@/app/components/chat/client/ChatRoom"
import { Chat, ChatRoom, ChatUser } from "@/model/chat.model"
import "@/styles/globals.css"
import ChatList from "@/app/components/chat/server/ChatList"

/**
 * 개별 채팅방 데이터 가져오기
 * TODO: 실제 서버 API로 교체 필요
 * @param {string} id
 * @return {*}
 */
async function getChatRoom(id: string): Promise<ChatRoom> {
  // const res = await fetch(`${process.env.SERVER_URI}/chat/${id}`)
  const now = new Date()
  const dummy = {
    title: "",
    time: now.toISOString(),
    users: [],
    userId: "1",
    chats: [
      {
        page: 1,
        size: 100,
        totalPage: 1,
        totalCount: 5,
        data: [] as Chat[],
      },
    ],
  } as ChatRoom

  dummy.users.push(new ChatUser("1", "pikachu"))
  dummy.users.push(new ChatUser("2", "ggobugi"))

  dummy.chats[0].data.push(new Chat("1", "1", "hoy", now.getTime()))
  dummy.chats[0].data.push(new Chat("1", "2", "hey", now.getTime()))
  dummy.chats[0].data.push(
    new Chat("2", "3", "hola https://naver.me/GNyRWZID", now.getTime()),
  )
  dummy.chats[0].data.push(new Chat("1", "4", "안녕", now.getTime()))

  return dummy
}

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
    jsonUsers: JSON.stringify(chatroom.users),
    children: undefined,
  }
  const users: { [key: string]: ChatUser } = {}
  chatroom.users.forEach(user => (users[user.id] = user))
  users[chatroom.userId].currUser = true // 로그인된 유저 마크

  return (
    <>
      <ChatRoomUI name={room.name} time={room.time} jsonUsers={room.jsonUsers}>
        {chatroom.chats.map(({ page, data }) => (
          <ChatList key={page} chats={data} users={users} />
        ))}
      </ChatRoomUI>
      {/* <ChatViewClient title={chat.title} users={JSON.stringify(chat.users)}>
        <ChatViewServer chats={chat.chats} users={chat.users} />
      </ChatViewClient> */}
    </>
  )
}
