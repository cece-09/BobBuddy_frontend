// 서버 요청 액션들
"use server"
import { Chat, ChatRoom, ChatUser } from "@/types/chat.types"
import { Paged } from "@/types/paged.types"

/**
 * 개별 채팅방 데이터 가져오기
 * TODO: 실제 서버 API로 교체 필요
 * @param {string} id
 * @return {*}
 */
export async function getChatRoom(id: string): Promise<ChatRoom> {
  // const res = await fetch(`${process.env.SERVER_URI}/chat/${id}`)
  const now = new Date()
  const chats = []
  chats.push(new Chat("1", "1", "hoy", now.getTime()))
  chats.push(new Chat("1", "2", "hey", now.getTime()))
  chats.push(
    new Chat("2", "3", "hola https://naver.me/GNyRWZID", now.getTime()),
  )
  chats.push(new Chat("1", "4", "안녕", now.getTime()))
  chats.push(new Chat("1", "5", "안녕", now.getTime()))
  chats.push(new Chat("1", "6", "안녕", now.getTime()))
  chats.push(new Chat("1", "7", "안녕", now.getTime()))
  chats.push(new Chat("1", "8", "안녕", now.getTime()))
  chats.push(new Chat("1", "9", "안녕", now.getTime()))
  chats.push(new Chat("1", "10", "안녕", now.getTime()))
  chats.push(new Chat("1", "11", "안녕", now.getTime()))
  chats.push(new Chat("1", "12", "안녕", now.getTime()))
  chats.push(new Chat("1", "13", "안녕", now.getTime()))

  const dummy = {
    title: "", // 채팅방 이름 (로케이션 정보)
    time: now.toISOString(), // 만날 시간
    users: [], // 참가 유저 정보
    userId: "1", // 현재 로그인된 유저 아이디
    notice: chats[0], // 공지 채팅 객체 or null
    chats: [
      // 페이징된 챗 데이터 (초기 3페이지)
      {
        page: 1,
        size: 100, // 조정가능
        totalPage: 1,
        totalCount: 5,
        data: [] as Chat[],
      },
    ],
  } as ChatRoom

  dummy.users.push(new ChatUser("0", "김초원", ""))
  dummy.users.push(new ChatUser("1", "pikachu", ""))
  dummy.users.push(new ChatUser("2", "ggobugi", ""))
  dummy.chats[0].data = chats

  return dummy
}

/**
 * 역방향 스크롤시 새로운 채팅을
 * 페이지 단위로 불러옵니다
 *
 * @export
 * @param {number} timestamp
 * @param {number} pageNo
 * @param {number} [pageCount=1]
 * @param {number} [pageSize=100]
 * @return {*}  {Promise<Paged<Chat>[]>}
 */
export async function fetchPrevChats(
  timestamp: number,
  pageNo: number,
  pageCount: number = 1,
  pageSize: number = 100,
): Promise<Paged<Chat>[]> {
  // timestamp 이전의 채팅 데이터를
  // pageSize 단위로 페이징했을 때
  // pageNo번부터 pageCount개의 페이지를 요청합니다.
  if (pageNo > 5) {
    return []
  }
  return [
    {
      page: 1,
      size: 100, // 조정가능
      totalPage: 1,
      totalCount: 5,
      data: [new Chat("1", "5", "새로운 채팅 새로고침!", new Date().getTime())],
    },
  ] as Paged<Chat>[]
}

/**
 * 채팅을 공지로 등록합니다
 *
 * @export
 * @param {string} chatId
 * @return {*}
 */
export async function setChatNotice(chatId: string) {
  const data = new Chat(
    "1",
    chatId,
    "공지로 설정하고 서버에서 채팅객체 받아옴",
    new Date().getTime(),
  )
  return {
    status: 200,
    json: () => JSON.stringify(data),
  }
}

// 링크 URL로부터 HTML문서를 읽어옵니다
export async function fetchHTMLFromURL(url: string) {
  const res = await fetch(url)
  if (res.status !== 200) {
    console.error(`failed to fetch data from url included chat message`)
    return null
  }
  return await res.text()
}
