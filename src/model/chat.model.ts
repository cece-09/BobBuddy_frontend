import { Paged } from "./paged.model"

/**
 * 개별 채팅 메시지 정보
 * @class Chat
 */
export class Chat {
  userId: string
  chatId: string | null
  content: string
  timestamp: number

  // 생성자
  constructor(
    userId: string,
    chatId: string | null,
    content: string,
    timestamp: number,
  ) {
    this.userId = userId
    this.chatId = chatId
    this.content = content
    this.timestamp = timestamp
  }

  // 메시지로부터 현재 유저의 채팅 객체 생성
  // user id, chat id, timestamp 필드는 서버에서 무시되어야 합니다
  static fromContent(content: string): Chat {
    return new Chat("1", null, content, new Date().getTime())
  }

  // json string으로부터 Chat 객체 생성
  static fromJson(json: string) {
    const obj = JSON.parse(json)
    return new Chat(
      obj["userId"],
      obj["chatId"],
      obj["content"],
      obj["timestamp"],
    )
  }
}

/**
 * 채팅방 내 개별 유저 정보
 * @export
 * @class ChatUser
 */
export class ChatUser {
  id: string
  name: string
  profile: string
  currUser?: boolean
  createdAt: string
  deletedAt: string | null

  constructor(
    id: string,
    name: string,
    profile: string, // default profile pic
    createdAt: string = new Date().toISOString(),
    deletedAt: string | null = null,
  ) {
    this.id = id
    this.name = name
    this.profile = profile
    this.currUser = false
    this.createdAt = createdAt
    this.deletedAt = deletedAt
  }
}

/**
 * 개별 채팅방 한 개 정보
 * @class ChatRoom
 */
export class ChatRoom {
  title: string
  time: string
  users: ChatUser[]
  chats: Paged<Chat>[]
  userId: string

  constructor(
    title: string,
    time: string,
    users: ChatUser[] = [],
    chats: Paged<Chat>[],
  ) {
    this.title = title
    this.time = time
    this.users = users
    this.chats = chats
    this.userId = "1"
  }
}
