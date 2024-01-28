export type ChatMessageType = "text" | "link"

export type ParsedChatMessage = {
  thumb: string | null
  data: {
    index: number
    length: number
    type: ChatMessageType
  }[]
}

export interface OpenGraph {
  title: string
  image: string
  descr: string | null
}
