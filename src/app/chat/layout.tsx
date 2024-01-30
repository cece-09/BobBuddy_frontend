import { ReactNode } from "react"
import UserProvider from "../components/common/UserProvider"

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
