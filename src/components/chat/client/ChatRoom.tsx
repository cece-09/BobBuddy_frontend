"use client"

import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  Box,
  Chip,
  CircularProgress,
  Drawer,
  Icon,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material"
import ChatList from "../server/ChatList"
import ProfilePic from "../../common/ProfilePic"
import useChats from "../../../hooks/useChat"
import useSocket from "../../../hooks/useSocket"
import useInfiniteScroll from "../../../hooks/usePrevChat"
import { fetchPrevChats } from "../../../server-actions/chat.actions"
import { chatNoticeState, chatLoadingState } from "@/providers/chatAtom"
import { Chat, ChatUser } from "@/types/chat.types"
import { userState } from "@/providers/userAtom"

export interface ChatRoomProps {
  name: string
  time: string
  jsonNotice: string
  jsonUsers: string // json
  currPage: number // 현재 로드된 페이지 번호
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
  jsonNotice,
  jsonUsers,
  currPage,
  children, // server chat list
}: ChatRoomProps): JSX.Element {
  const user = useRecoilValue(userState)
  const users: { [key: string]: ChatUser } = {}
  const parse: ChatUser[] = JSON.parse(jsonUsers)
  parse.forEach(user => (users[user.id] = user))
  users[user.userData.userId.toString()].currUser = true // 로그인된 유저 마크

  // 상태
  const SERVER_URI = process.env.NEXT_PUBLIC_CHAT_SERVER_URI as string
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  const { socket, connect } = useSocket(SERVER_URI)
  const { chats } = useChats(socket)

  // 현재 보고 있는 채팅방의 공지 상태 업데이트
  const notice: Chat | null = JSON.parse(jsonNotice)
  const setChatNotice = useSetRecoilState(chatNoticeState)
  useEffect(() => {
    setChatNotice(notice)
  })

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
    const chat = new Chat(
      user.userData.userId.toString(),
      null,
      input,
      new Date().getTime(),
    )
    socket?.emit("send-chat", chat)
    setInput("")
  }

  // 나의 채팅방이 아닙니다.
  if (!(user.userData.userId.toString() in Object.keys(users))) {
    console.error(`not my chatroom!`)
    return <div>unauthorized</div>
  }

  return (
    <>
      <Stack direction='column' height='100vh'>
        <ChatRoomAppBar
          title={name}
          onBackClick={() => {}}
          onMenuClick={toggle}
        />
        <ChatRoomContentArea {...{ chats, users, currPage }}>
          <ChatRoomNotice />
          {children}
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
 * 공지로 설정된 채팅이 있으면
 * 상단에 표시합니다.
 *
 * @param {{ chat: Chat }} { chat }
 * @return {JSX.Element}
 */
function ChatRoomNotice(): JSX.Element {
  const chat = useRecoilValue(chatNoticeState)
  if (chat === null) {
    return <></>
  } else {
    // TODO: onclick 전체보기 기능 추가해야함
    return (
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          padding: "0.5rem",
          top: "5vh",
          left: 0,
        }}
      >
        <Stack
          direction='row'
          sx={{
            width: "100%",
            maxHeight: "10vh",
            overflow: "hidden",
            textOverflow: "ellipsis",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "0.5rem",
            gap: "0.5rem",
          }}
        >
          <Chip size='small' label='공지' />
          <Icon sx={{ color: "gray" }}>campaign_rounded</Icon>
          <div>{chat.content}</div>
        </Stack>
      </Box>
    )
  }
}

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
              {user.id === me.userData.userId.toString() ? (
                <div>나</div>
              ) : (
                <></>
              )}
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
  currPage,
  users,
}: {
  children: ReactNode
  chats: Chat[] // 클라이언트에 새로 추가되는 채팅
  currPage: number
  users: { [key: string]: ChatUser }
}): JSX.Element {
  const [enterTime, setEnterTime] = useState<number>(0)
  const [pageNo, setPageNo] = useState<number>(currPage)
  useEffect(() => {
    // 마운트 시 현재 시각 정보 저장
    setEnterTime(new Date().getTime())
  }, [])

  // 역방향 스크롤시 불러오는 이전 채팅 데이터
  const {
    loadingRef,
    data: prevChats,
    isLoading: prevChatLoading,
  } = useInfiniteScroll(enterTime, fetchPrevChats)

  const scroll = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const loading = useRecoilValue(chatLoadingState)
  useLayoutEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight
    }
  }, [])
  useEffect(() => {
    if (scroll.current != null) {
      scroll.current.scrollIntoView({
        // behavior: "smooth",
      })
    }
  }, [loading, chats])

  return (
    <Box
      ref={container}
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "0rem 0.5rem",
      }}
    >
      <div style={{ height: "50px" }} ref={loadingRef} />
      {prevChatLoading ? (
        <CircularProgress />
      ) : (
        <ChatList chats={prevChats} users={users} />
      )}
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
        height: "5vh",
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
          border: "1px solid black",
          borderRadius: "1em",
          width: "100%",
          minHeight: "5vh",
          alignItems: "center",
          padding: "0.5rem",
          gap: "0.3rem",
        }}
      >
        <TextareaAutosize
          maxRows={4}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            outline: "none",
          }}
          value={message}
          onChange={onChange}
          onKeyDown={e => {
            if (e.key !== "Enter") return
            if (!e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              e.stopPropagation()
              sendChat()
            }
          }}
        ></TextareaAutosize>
        <Icon onClick={() => sendChat()}>send_rounded</Icon>
      </Stack>
    </Box>
  )
}
