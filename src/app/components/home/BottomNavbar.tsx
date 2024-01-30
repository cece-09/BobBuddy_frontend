import { Paper, Stack, Icon, Typography } from "@mui/material"
import Link from "next/link"
import BottomNavbarItemList from "./constants"

export default function BottomNavbar() {
  return (
    <Paper>
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
              <Icon>{icon}</Icon>
              <Typography>{text}</Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Paper>
  )
}
