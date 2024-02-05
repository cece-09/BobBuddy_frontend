"use client"
import { Paper, Stack, Icon, Typography } from "@mui/material"
import { usePathname } from "next/navigation"
import BottomNavbarItemList from "@/constants/home.constants"
import Link from "next/link"

/**
 * 하단 내비게이션바입니다.
 * 현대 페이지에 해당하는 아이템을 하이라이팅합니다.
 *
 * @client
 * @return {JSX.Element}
 */
export default function BottomNavbar(): JSX.Element {
  const current = usePathname()
  const found = BottomNavbarItemList.find(item => item.link === current)
  if (!found) return <></>

  return (
    <Paper sx={{ position: "absolute", bottom: 0, width: "100%" }}>
      <Stack
        direction='row'
        width='100%'
        sx={{ backgroundColor: "white" }}
        padding='0.5rem'
        justifyContent='space-around'
      >
        {BottomNavbarItemList.map(({ icon, text, link }, idx) => (
          <Link key={idx} href={link}>
            <Stack direction='column' alignItems='center'>
              <Icon color={current === link ? "primary" : "inherit"}>
                {icon}
              </Icon>
              <Typography color={current === link ? "primary" : "inherit"}>
                {text}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Paper>
  )
}
