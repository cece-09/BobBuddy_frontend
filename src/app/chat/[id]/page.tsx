import ChatViewClient from "./_view.client"
import ChatViewServer from "./_view.server"
import { Chat, ChatRoom, ChatUser } from "@/model/chat.model"
import "@/styles/globals.css"

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

  dummy.chats[0].data.push(new Chat("1", "1", "hoy", now.toISOString(), false))
  dummy.chats[0].data.push(new Chat("1", "2", "hey", now.toISOString(), false))
  dummy.chats[0].data.push(new Chat("2", "3", "hola", now.toISOString(), false))
  dummy.chats[0].data.push(new Chat("1", "4", "안녕", now.toISOString(), false))

  return dummy
}

/**
 * 개별 채팅방 페이지
 * @server
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default async function ChatPage({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> {
  const chat = await getChatRoom(params.id)
  return (
    <>
      <ChatViewClient title={chat.title} users={JSON.stringify(chat.users)}>
        <ChatViewServer chats={chat.chats} users={chat.users} />
      </ChatViewClient>
    </>
  )
}
