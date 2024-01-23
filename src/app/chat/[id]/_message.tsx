"use client"

import { Box, Stack } from "@mui/material"

export default function ChatMessage({
  message,
  time,
}: {
  message: string
  time: string
}) {
  return (
    <Stack
      direction='row'
      alignItems='end'
      gap='0.5rem'
      sx={{ width: "100%", padding: "0.5rem 0rem" }}
    >
      <Box
        sx={{
          borderRadius: "0.5rem",
          backgroundColor: "#eee",
          padding: "0.5rem 0.8rem",
        }}
      >
        {message}
      </Box>

      <Box
        sx={{
          color: "#444",
          fontSize: "0.9rem",
        }}
      >
        {time}
      </Box>
    </Stack>
  )
}
