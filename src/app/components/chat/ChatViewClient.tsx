"use client"

import { Chat, ChatUser } from "@/model/chat.model"
import { Box, Icon, Input, Stack } from "@mui/material"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import ChatMessage from "./ChatMessage"
import ClientWrapper from "@/app/components/common/ClientWrapper"

/**
 * 개별 채팅방의 화면입니다
 * @client
 * @param {{ children: ReactNode }} { children }
 * @return {*}
 */
export default function ChatViewClient({
  title,
  users,
  children,
}: {
  title: string
  users: string
  children: ReactNode
}): JSX.Element {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connect, setConnect] = useState<boolean>(false)
  const [newChat, setNewChat] = useState<Chat[]>([])
  const [message, setMessage] = useState<string>("")
  const lastChat = useRef<HTMLDivElement>(null)

  const CURRENT_USER_ID = "1" // TODO: 전역유저상태로 교체 필요
  const chatUsers: ChatUser[] = JSON.parse(users)

  const getUserInfo = (id: string) => {
    const filtered = chatUsers.filter(user => user.id === id)
    return filtered[0]
  }

  /* socket 연결을 담당합니다 */
  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_SERVER_URI}`, {
      transports: ["websocket"],
    })

    // 소켓 연결 시 상태 초기화
    newSocket?.on("connect", () => {
      console.log("socket connected")
      setConnect(true)
      setSocket(newSocket)
    })

    // 새로운 채팅 수신
    socket?.on("new-chat", (message: any) => {
      const chat = Chat.fromJson(message)
      setNewChat(prevChats => [...prevChats, chat])
    })

    // 발송한 채팅에 대한 결과 수신
    // TODO: 서버 소켓 엔드포인트 수정시 변경 필요
    socket?.on("send-chat-response", (message: string) => {
      const { chatId, status } = JSON.parse(message)
      if (status !== "OK") {
        // TODO: 해당 chatId에 재전송 버튼 노출
      }
    })

    return () => {
      socket?.off("connect")
      socket?.off("new-chat")
      socket?.off("send-chat-response")
    }
  }, [connect])

  // 항상 맨 마지막 스크롤을 유지합니다
  useEffect(() => {
    if (lastChat.current !== null) {
      ;(lastChat.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [newChat])

  // 채팅을 발송합니다
  const sendChat = () => {
    if (message == "") return
    const chat = Chat.fromContent(message)
    socket?.emit("send-chat", chat)
    setMessage("")
  }

  return (
    <>
      {!connect ? ( // 소켓 연결에 실패할 경우 렌더링하지 않음
        <></>
      ) : (
        <Stack
          direction='column'
          sx={{ height: "100vh", backgroundColor: "var(--color-gray-2)" }}
        >
          <Stack
            direction='row'
            sx={{
              backgroundColor: "white",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <Icon>home</Icon>
            <div>{title}</div>
            <Icon>menu</Icon>
          </Stack>
          {/* ========== chat view ========== */}
          {/* // TODO: 분리 */}
          <Box
            sx={{
              padding: "0rem 0.5rem",
              overflowY: "auto",
              overflowX: "hidden",
              height: "100%",
            }}
          >
            {
              // server components
              children
            }
            {
              // client components
              newChat.map((nc, idx) => {
                const date = new Date(nc.timestamp)
                const prevUser = idx === 0 ? null : newChat[idx - 1]
                const prevGap =
                  prevUser == null
                    ? null
                    : date.getSeconds() -
                      new Date(prevUser.timestamp).getSeconds()
                return (
                  <ClientWrapper key={idx}>
                    <ChatMessage
                      content={nc.content}
                      time={`${date.getHours()}:${date.getMinutes()}`}
                      user={
                        nc.userId === null || nc.userId === CURRENT_USER_ID
                          ? null
                          : getUserInfo(nc.userId!)
                      }
                      prevGap={prevGap}
                      prevUserId={prevUser?.userId ?? null}
                    />
                  </ClientWrapper>
                )
              })
            }
            <div ref={lastChat} />
          </Box>
          {/* ========== type ========== */}
          {/*// TODO:  분리 */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "0.5rem",
              width: "100%",
            }}
          >
            <Stack
              direction='row'
              sx={{
                border: "1px solid #eee",
                borderRadius: "3em",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Icon sx={{}}>add</Icon>
              <Input
                sx={{ width: "100%", padding: "0rem", outline: "none" }}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.stopPropagation()
                    sendChat()
                  }
                }}
              />
              <Icon onClick={() => sendChat()}>send</Icon>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  )
}
