import { Stack } from "@mui/material"
import { ReactNode } from "react"

export const ModalBackdrop = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) => {
  return (
    <div onClick={onClick}>
      <Stack
        width='100vw'
        height='100vh'
        justifyContent='center'
        alignItems='center'
        sx={{
          backgroundColor: "#00000070",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </Stack>
    </div>
  )
}
