import { Button, Stack, Typography } from "@mui/material"
import Link from "next/link"

export default function MainPage() {
  const screens = [
    { href: "/login", name: "로그인" },
    { href: "/chat/1", name: "채팅방" },
  ]
  return (
    <Stack direction='column' gap='0.5rem' padding='0.5rem' height='100vh'>
      <Typography>화면 테스트</Typography>
      {screens.map(({ href, name }, idx) => (
        <Link key={idx} href={href}>
          <Button variant='contained' fullWidth disableElevation>
            {name}
          </Button>
        </Link>
      ))}
    </Stack>
  )
}
