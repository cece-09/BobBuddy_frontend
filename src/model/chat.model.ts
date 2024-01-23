/**
 * Single Chat Object
 * 개별 채팅 메시지 한 개를 가리킵니다.
 * @class Chat
 */
export class Chat {
  userId: string | null
  chatId: string | null
  message: string
  timestamp: string
  isNotice: boolean

  /**
   * Creates an instance of Chat.
   * @param {string} userId
   * @param {string} message
   * @param {string} timestamp
   * @param {boolean} [isNotice=false]
   * @memberof Chat
   */
  constructor(
    userId: string | null,
    chatId: string | null,
    message: string,
    timestamp: string,
    isNotice: boolean = false,
  ) {
    this.userId = userId
    this.chatId = chatId
    this.message = message
    this.timestamp = timestamp
    this.isNotice = isNotice
  }

  /**
   *
   * @param json
   * @returns
   */
  static fromJson(json: string) {
    const obj = JSON.parse(json)
    return new Chat(
      obj["userId"],
      obj["chatId"],
      obj["message"],
      obj["timestamp"],
      obj["isNotice"],
    )
  }

  /**
   *
   * @returns
   */
  static toJson() {
    return JSON.stringify(this)
  }
}
