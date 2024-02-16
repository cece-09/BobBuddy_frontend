"use client"

import { getAccessToken } from "@/utils/interceptor"
import { Button, Stack, Typography } from "@mui/material"

export default function SettingPage() {
  const handleLogout = () => {
    signout()
    window.location.href = "/login"
  }
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

export const signout = () => {
  if (!getAccessToken()) return
  document.cookie = "token=;max-age=-1;path=/"
}
