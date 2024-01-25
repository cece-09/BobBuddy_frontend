"use client"

import { ReactNode, useEffect } from "react"
import { RecoilRoot, atom, useRecoilState } from "recoil"
import { Socket, io } from "socket.io-client"

export const socketState = atom({
  key: "socketState",
  default: null as Socket | null,
})

function SocketConnect({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useRecoilState<Socket | null>(socketState)
  useEffect(() => {
    const conn: Socket = io(`${process.env.NEXT_PUBLIC_SERVER_URI}`, {
      transports: ["websocket"],
    })

    conn.on("connect", () => {
      console.log("socket connected: ", conn.id)
      setSocket(conn)
    })

    return () => {
      socket?.off("connect")
    }
  }, [socket])
  return <>{children}</>
}

export default function SocketProvider({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <SocketConnect>{children}</SocketConnect>
    </RecoilRoot>
  )
}
