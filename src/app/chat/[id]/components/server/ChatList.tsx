import ChatEntry from './ChatEntry';
import {
  CHAT_SHOW_MINE,
  CHAT_SHOW_NOTI,
  CHAT_SHOW_TIME,
  CHAT_SHOW_USER,
  CHAT_STD_TIME,
} from '../../../../../constants/chat';
import { Chat, ChatUser } from '@/types/chat';

/**
 * 채팅 목록을 렌더링합니다
 * 이전 이후 채팅 간격 및 유저정보에 따라
 * 개별 채팅 엔트리에 렌더링 옵션을 지정해 넘깁니다
 *
 * @export
 * @param {{
 *   chats: Chat[]
 *   users: { [_: string]: ChatUser }
 * }} {
 *   chats,
 *   users,
 * }
 * @return {JSX.Element}
 */
export default function ChatList({
  chats,
  users,
}: {
  chats: Chat[];
  users: { [_: string]: ChatUser };
}): JSX.Element {
  // 채팅에 적용되는 옵션값을 계산하여 반환합니다.
  function configure(idx: number) {
    const curr = chats[idx];
    let option = 0;

    const timeOut = (target: Chat) => {
      const abs = (num: number) => (num < 0 ? -1 * num : num);
      return abs(target.timestamp - curr.timestamp) > CHAT_STD_TIME;
    };

    if (curr.userId && users[curr.userId].currUser) {
      // 내가 작성한 채팅입니다.
      option |= CHAT_SHOW_MINE;
    }

    let prev, next;
    if (
      idx === 0 ||
      ((prev = chats[idx - 1]) && (prev.userId != curr.userId || timeOut(prev)))
    ) {
      // 첫 번째 메시지입니다, 또는
      // 이전 채팅 메시지와 작성자가 다르거나
      // 타임스탬프가 60초 초과입니다.
      option |= CHAT_SHOW_USER;
    }

    if (
      idx === chats.length - 1 ||
      ((next = chats[idx + 1]) && timeOut(next))
    ) {
      // 마지막 메시지입니다, 또는
      // 이후 채팅 메시지와 타임스탬프가 60초 초과입니다.
      option |= CHAT_SHOW_TIME;
    }
    return option;
  }

  // 렌더링
  return (
    <>
      {chats.map(({ content, timestamp, userId, chatId }, idx) => {
        if (!userId || users[userId] === undefined) {
          return <></>;
        }
        return (
          <ChatEntry
            key={idx}
            chatId={chatId!}
            content={content}
            timestamp={timestamp}
            user={users[userId]}
            options={configure(idx)}
          />
        );
      })}
    </>
  );
}
