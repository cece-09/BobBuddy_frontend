import { Chat, ChatUser } from "@/model/chat.model"
import { Paged } from "@/model/paged.model"
import ChatMessage from "./ChatMessage"
import "server-only"

/**
 * 채팅방의 채팅 데이터를 받아
 * 초기 채팅방 화면을 SSR로 구성합니다
 * @server
 * @param {{ id: string }} { id }
 * @return {*}
 */
export default function ChatViewServer({
  chats,
  users,
}: {
  chats: Paged<Chat>[]
  users: ChatUser[]
}): JSX.Element {
  const getUserInfo = (id: string) => {
    const filtered = users.filter(user => user.id === id)
    return filtered[0]
  }

  return (
    <>
      {chats.map(chat =>
        chat.data.map((each, idx) => {
          const date: Date = new Date(each.timestamp)
          const prevUser = idx === 0 ? null : chat.data[idx - 1]
          const prevGap =
            prevUser == null
              ? null
              : date.getSeconds() - new Date(prevUser.timestamp).getSeconds()

          return (
            <ChatMessage
              key={idx}
              content={each.content}
              time={`${date.getHours()}:${date.getMinutes()}`}
              user={
                each.userId === null || each.userId === "1"
                  ? null
                  : getUserInfo(each.userId!)
              }
              prevGap={prevGap}
              prevUserId={prevUser?.userId ?? null}
            />
          )
        }),
      )}
    </>
  )
}
