// 지금 유저가 보고 있는 채팅방의 공지 아이디

import { Chat } from "@/model/chat.model"
import { atom } from "recoil"

const ChatNoticeState = atom<null | Chat>({
  key: "ChatNoticeState",
  default: null,
})

export default ChatNoticeState
