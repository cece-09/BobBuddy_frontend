import { Chat } from "@/model/chat.model"
import { Paged } from "@/model/paged.model"
import { useCallback, useEffect, useRef, useState } from "react"

function useInfiniteScroll(
  timestamp: number,
  fetchData: (timestamp: number, pageNo: number) => Promise<Paged<Chat>[]>,
) {
  const [data, setData] = useState<Chat[]>([])
  const [pageNo, setPageNo] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const loadingRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    setIsLoading(true)
    fetchData(timestamp, pageNo + 1).then(fetched => {
      fetched.forEach(each => setData(prev => [...prev, ...each.data]))
      setPageNo(prev => prev + 1)
      setIsLoading(false)
    })
  }, [fetchData, pageNo])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore()
        }
      },
      { threshold: 1.0 },
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current)
      }
    }
  }, [loadMore, isLoading])

  return { loadingRef, data, isLoading }
}

export default useInfiniteScroll
