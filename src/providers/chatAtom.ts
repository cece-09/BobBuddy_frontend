import { Chat } from "@/types/chat.types"
import { atom } from "recoil"

// 채팅방 상태
export const chatLoadingState = atom<boolean>({
  key: "chatLoadingState",
  default: false,
})

// 지금 유저가 보고 있는 채팅방의 공지 아이디
export const chatNoticeState = atom<null | Chat>({
  key: "ChatNoticeState",
  default: null,
})
