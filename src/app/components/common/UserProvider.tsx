"use client"

// temp file입니다.
import { ReactNode } from "react"
import { RecoilRoot, atom, useRecoilState } from "recoil"

export const userState = atom({
  key: "userState",
  default: {
    id: "1",
    name: "pikachu",
  },
})

function UserState({ children }: { children: ReactNode }) {
  const [user, setUser] = useRecoilState(userState)
  return <>{children}</>
}

export default function UserProvider({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <UserState>{children}</UserState>
    </RecoilRoot>
  )
}
