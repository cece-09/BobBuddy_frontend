import { Chat } from '@/types/chat';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

export interface ChatRoomContextType {
  name: string;
  time: string;
  pageNo: number;
  newChats: Chat[];
  noticeId: string | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setNewChats: Dispatch<SetStateAction<Chat[]>>;
  setNoticeId: Dispatch<SetStateAction<string | undefined>>;
}

export const ChatRoomContext = createContext<ChatRoomContextType>({
  name: '',
  time: '',
  pageNo: 0,
  newChats: [],
  noticeId: undefined,
  loading: false,
  setNewChats: () => {},
  setNoticeId: () => {},
  setLoading: () => {},
});

interface ChatRoomProviderProps {
  children: ReactNode;
  name: string;
  time: string;
  pageNo: number;
  defaultNoticeId: string | undefined;
}

export const ChatRoomProvider = ({
  children,
  name,
  time,
  pageNo,
  defaultNoticeId,
}: ChatRoomProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newChats, setNewChats] = useState<Chat[]>([]);
  const [noticeId, setNoticeId] = useState<string | undefined>(defaultNoticeId);

  return (
    <ChatRoomContext.Provider
      value={{
        name,
        time,
        pageNo,
        newChats,
        noticeId,
        loading,
        setNewChats,
        setNoticeId,
        setLoading,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};
