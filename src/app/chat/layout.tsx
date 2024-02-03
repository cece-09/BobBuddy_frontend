import { ReactNode } from "react"
import UserProvider from "../../providers/UserProvider"

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
