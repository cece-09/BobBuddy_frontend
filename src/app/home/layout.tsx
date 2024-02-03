import { Box, Stack } from "@mui/material"
import { ReactNode } from "react"
import BottomNavbar from "../../components/home/BottomNavbar"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <Stack
      direction='column'
      width='100%'
      height='100vh'
      justifyContent='space-between'
    >
      <Box sx={{ height: "100%" }}>{children}</Box>
      <BottomNavbar current='/home' />
    </Stack>
  )
}
