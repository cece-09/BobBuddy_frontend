import { Chat } from '@/types/chat.types';
import { Paged } from '@/types/paged.types';
import { useEffect, useRef, useState } from 'react';

function useInfiniteScroll(
  timestamp: number,
  fetchData: (timestamp: number, pageNo: number) => Promise<Paged<Chat>[]>,
  initialPageNo?: number, // 현재 페이지 번호 초기화
) {
  const [data, setData] = useState<Chat[]>([]); // 현재 보이는 채팅 목록
  const [pageNo, setPageNo] = useState<number>(initialPageNo ?? 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          fetchData(timestamp, pageNo + 1)
            .then(fetched => {
              fetched.forEach(each => setData(prev => [...prev, ...each.data]));
              setPageNo(prev => prev + 1);
            })
            .catch((error: Error) => {
              console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      },
      { threshold: 1.0 },
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, []);

  return { loadingRef, data, isLoading };
}

export default useInfiniteScroll;
