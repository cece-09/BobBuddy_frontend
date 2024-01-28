"use client"

import { Chat, ChatUser } from "@/model/chat.model"
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import { userState } from "../../common/UserProvider"
import { Box, Drawer, Icon, Input, Stack, Typography } from "@mui/material"
import ChatList from "../server/ChatList"
import ProfilePic from "../../common/ProfilePic"
import useChats from "../hooks/useChat"
import useSocket from "../hooks/useSocket"
import chatLoadingState from "../ChatLoadingState"

export interface ChatRoomProps {
  name: string
  time: string
  jsonUsers: string // json
  children: ReactNode
}

/**
 * 채팅방 화면의 전체 레이아웃 렌더링합니다
 *
 * @export
 * @client
 * @param {ChatRoomProps} {
 *   name,
 *   time,
 *   jsonUsers,
 *   children, // server chat list
 * }
 * @return {JSX.Element}
 */
export default function ChatRoomUI({
  name,
  time,
  jsonUsers,
  children, // server chat list
}: ChatRoomProps): JSX.Element {
  const user = useRecoilValue(userState)
  const users: { [key: string]: ChatUser } = {}
  const parse: ChatUser[] = JSON.parse(jsonUsers)
  parse.forEach(user => (users[user.id] = user))
  users[user.id].currUser = true // 로그인된 유저 마크

  // 나의 채팅방이 아닙니다.
  if (!(user.id in Object.keys(users))) {
    console.error(`not my chatroom!`)
    return <div>unauthorized</div>
  }

  // status
  const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI as string
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  const { socket, connect } = useSocket(SERVER_URI)
  const { chats } = useChats(socket)

  // 사이드바 토글 함수
  const toggle = () => {
    if (sidebar === true) {
      setSidebar(false)
    } else {
      setSidebar(true)
    }
  }

  // 채팅 발송
  const sendChat = () => {
    // socket
    if (input === "") return
    const chat = new Chat(user.id, null, input, new Date().getTime())
    socket?.emit("send-chat", chat)
    setInput("")
  }

  return (
    <>
      <Stack direction='column' height='100vh'>
        <ChatRoomAppBar
          title={name}
          onBackClick={() => {}}
          onMenuClick={toggle}
        />
        <ChatRoomContentArea chats={chats} users={users}>
          {children}
          {/* <div ref={scroll} /> */}
        </ChatRoomContentArea>
        <ChatRoomInput
          message={input}
          onChange={e => setInput(e.target.value)}
          sendChat={sendChat}
        />
      </Stack>
      <Drawer anchor='right' open={sidebar} onClose={toggle}>
        <ChatRoomSidebar users={Object.values(users)} />
      </Drawer>
    </>
  )
}

/* ===== Sub Components ===== */
// TODO: 코드가 길어지면 파일을 나눕니다

/**
 * 채팅방 사이드바에 유저 목록 등을 렌더링합니다
 *
 * @param {{ users: ChatUser[] }} { users }
 * @return {JSX.Element}
 */
function ChatRoomSidebar({ users }: { users: ChatUser[] }): JSX.Element {
  const me = useRecoilValue(userState)

  return (
    <Stack height='100vh' width='80vw' minWidth='300px'>
      <Box height='100%' padding='0.5rem'>
        <Typography>대화상대</Typography>

        {
          // TODO: 프로필 누르면 유저 정보창으로 바로가기
          users.map((user, idx) => (
            <Stack
              key={idx}
              direction='row'
              gap='0.5rem'
              alignItems='center'
              padding='0.3rem 0rem'
            >
              <ProfilePic src={user.profile} />
              <div>{user.name}</div>
              {user.id === me.id ? <div>나</div> : <></>}
            </Stack>
          ))
        }
      </Box>
      <Stack
        direction='row'
        sx={{ backgroundColor: "#eee", padding: "0.5rem" }}
      >
        <Icon>logout_rounded</Icon>
      </Stack>
    </Stack>
  )
}

/**
 * 채팅 내용이 보여지는 영역을 렌더링합니다
 * 스크롤 관련 로직 및 서버/클라이언트 컴포넌트 배치를 처리합니다
 *
 * @client
 * @param {{
 *   children: ReactNode
 *   chats: Chat[]
 *   users: { [key: string]: ChatUser }
 * }} {
 *   children,
 *   chats,
 *   users,
 * }
 * @return {JSX.Element}
 */
function ChatRoomContentArea({
  children,
  chats,
  users,
}: {
  children: ReactNode
  chats: Chat[]
  users: { [key: string]: ChatUser }
}): JSX.Element {
  // ref
  const scroll = useRef<HTMLDivElement>(null)
  const loading = useRecoilValue(chatLoadingState)
  useEffect(() => {
    if (scroll.current != null) {
      scroll.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [loading, chats])

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "0rem 0.5rem",
      }}
    >
      {children}
      <ChatList chats={chats} users={users} />
      <div ref={scroll} />
    </Box>
  )
}

/**
 * 채팅방 상단 앱바를 렌더링합니다
 *
 * @param {{
 *   title: string
 *   onBackClick: () => void
 *   onMenuClick: () => void
 * }} {
 *   title,
 *   onBackClick,
 *   onMenuClick,
 * }
 * @return {JSX.Element}
 */
function ChatRoomAppBar({
  title,
  onBackClick,
  onMenuClick,
}: {
  title: string
  onBackClick: () => void
  onMenuClick: () => void
}): JSX.Element {
  return (
    <Stack
      direction='row'
      sx={{
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <Icon onClick={() => onBackClick()}>arrow_back_ios_rounded</Icon>
      <Typography>{title}</Typography>
      <Icon onClick={() => onMenuClick()}>menu_rounded</Icon>
    </Stack>
  )
}

/**
 * 채팅방 하단 입력창을 렌더링합니다
 *
 * @param {({
 *   message: string
 *   onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
 *   sendChat: () => void
 * })} {
 *   message,
 *   onChange,
 *   sendChat,
 * }
 * @return {JSX.Element}
 */
function ChatRoomInput({
  message,
  onChange,
  sendChat,
}: {
  message: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  sendChat: () => void
}): JSX.Element {
  return (
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
        <Input
          sx={{ width: "100%", padding: "0rem", outline: "none" }}
          value={message}
          onChange={onChange}
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
  )
}
