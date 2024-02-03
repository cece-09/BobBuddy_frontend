import { Chat } from "@/types/chat.types"
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"

/**
 * 소켓으로 전달되는 새로운 채팅 목록을 반환합니다ㄴ
 *
 * @param {(Socket | null)} socket
 * @return {{ chats: Chat[] }}
 */
const useChats = (socket: Socket | null): { chats: Chat[] } => {
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    if (socket) {
      socket.on("new-chat", (message: string) => {
        const chat = Chat.fromJson(message)
        setChats(prev => [...prev, chat])
      })

      socket.on("send-chat-response", (message: string) => {
        const { chatId, status } = JSON.parse(message)
        if (status !== "OK") {
          // TODO: 해당 chatId에 재전송 버튼 노출
        }
      })
    }
    return () => {
      socket?.off("new-chat")
      socket?.off("send-chat-response")
    }
  }, [socket])

  return { chats }
}

export default useChats
