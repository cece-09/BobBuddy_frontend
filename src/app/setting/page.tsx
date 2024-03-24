"use client"

import { requestSignOut } from "@/server/auth"
import { getAccessToken, removeAccessToken } from "@/utils/server"
import { Button, Stack, Typography } from "@mui/material"

export default function SettingPage() {
  const handleLogout = () => signout()

  return (
    <Stack
      sx={{
        padding: "2rem 1rem",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "scroll",
        pb: "10vh",
      }}
    >
      <Typography mb={2} sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        설정
      </Typography>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Stack>
  )
}

const signout = async () => {
  if (!getAccessToken()) {
    return
  }

  await requestSignOut().then(ret => {
    if (ret) removeAccessToken()
  })
}
