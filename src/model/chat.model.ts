import { Paged } from "./paged.model"

/**
 * 개별 채팅 메시지 정보
 * @class Chat
 */
export class Chat {
  userId: string | null
  chatId: string | null
  content: string
  timestamp: string
  isNotice: boolean

  // 생성자
  constructor(
    userId: string | null,
    chatId: string | null,
    content: string,
    timestamp: string,
    isNotice: boolean = false,
  ) {
    this.userId = userId
    this.chatId = chatId
    this.content = content
    this.timestamp = timestamp
    this.isNotice = isNotice
  }

  // 메시지로부터 현재 유저의 채팅 객체 생성
  // user id 필드는 서버에서 무시되어야 합니다
  static fromContent(content: string): Chat {
    return new Chat(null, null, content, new Date().toISOString(), false)
  }

  // json string으로부터 Chat 객체 생성
  static fromJson(json: string) {
    const obj = JSON.parse(json)
    return new Chat(
      obj["userId"],
      obj["chatId"],
      obj["content"],
      obj["timestamp"],
      obj["isNotice"] ?? false,
    )
  }

  // Chat 객체를 json string으로 변환
  static toJson() {
    return JSON.stringify(this)
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
  createdAt: string
  deletedAt: string | null

  constructor(
    id: string,
    name: string,
    profile: string = "/assets/icons/icon-48x48.png", // default profile pic
    createdAt: string = new Date().toISOString(),
    deletedAt: string | null = null,
  ) {
    this.id = id
    this.name = name
    this.profile = profile
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
  users: any[]
  chats: Paged<Chat>[]

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
  }
}
