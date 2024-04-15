import { Paged } from './common';

export class Chat {
  userId: string;
  chatId: string | undefined;
  content: string;
  timestamp: number;

  // 생성자
  constructor(
    userId: string,
    chatId: string | undefined,
    content: string,
    timestamp: number,
  ) {
    this.userId = userId;
    this.chatId = chatId;
    this.content = content;
    this.timestamp = timestamp;
  }

  static fromContent(content: string): Chat {
    return new Chat('1', undefined, content, new Date().getTime());
  }

  // json string으로부터 Chat 객체 생성
  static fromJson(json: string) {
    const obj = JSON.parse(json);
    return new Chat(
      obj['userId'],
      obj['chatId'],
      obj['content'],
      obj['timestamp'],
    );
  }
}

/**
 * 채팅방 내 개별 유저 정보
 * @export
 * @class ChatUser
 */
export class ChatUser {
  id: string;
  name: string;
  profile: string;
  currUser?: boolean;
  createdAt: string;
  deletedAt: string | null;

  constructor(
    id: string,
    name: string,
    profile: string, // default profile pic
    createdAt: string = new Date().toISOString(),
    deletedAt: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.profile = profile;
    this.currUser = false;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }
}

/**
 * 개별 채팅방 한 개 정보
 * @class ChatRoom
 */
export class ChatRoom {
  title: string;
  time: string;
  users: ChatUser[];
  chats: Paged<Chat>[];
  userId: string;
  notice: Chat | undefined;

  constructor(
    title: string,
    time: string,
    users: ChatUser[] = [],
    chats: Paged<Chat>[],
    notice?: Chat | undefined,
  ) {
    this.title = title;
    this.time = time;
    this.users = users;
    this.chats = chats;
    this.userId = '1';
    this.notice = notice;
  }
}

export type ChatMessageType = 'text' | 'link';

export type ParsedChatMessage = {
  thumb: string | null;
  data: {
    index: number;
    length: number;
    type: ChatMessageType;
  }[];
};

export interface OpenGraph {
  title: string;
  image: string;
  descr: string | null;
}
