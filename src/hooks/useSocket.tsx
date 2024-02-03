import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

/**
 * 서버 URL을 인자로 받아
 * 소켓 연결 설정 및 해제를 담당합니다
 *
 * @param {string} SERVER_URI
 * @return {{ socket: Socket | null; connect: boolean }}
 */
const useSocket = (
  SERVER_URI: string,
): { socket: Socket | null; connect: boolean } => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connect, setConnect] = useState<boolean>(false)

  // TODO: 채팅화면 테스트차 소켓 막아둠
  useEffect(() => {
    const conn = io(SERVER_URI, {
      transports: ["websocket"],
      reconnectionAttempts: 10,
    })
    conn.on("connect", () => {
      console.debug("socket connected", conn.id)
      setConnect(true)
      setSocket(conn)
    })
    conn.on("disconnect", () => {
      console.debug("socket disconnected", conn.id)
      setConnect(false)
      setSocket(null)
    })
    return () => {
      conn.off("connect")
      conn.off("disconnect")
    }
  }, [SERVER_URI])

  return { socket, connect }
}

export default useSocket
