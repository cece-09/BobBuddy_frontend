"use client"
import { ReactNode, useState } from "react"
import GestureDetector from "./GestureDetector"
import {
  Box,
  Button,
  Icon,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material"
import { Chat } from "@/model/chat.model"
import { useRecoilState } from "recoil"
import ChatNoticeState from "../ChatNoticeState"
import { setChatNotice } from "../action/chat.actions"
import { ModalBackdrop } from "../../common/ModalBackdrop"

/**
 * 길게 누르면 메뉴를 보여주는
 * 클라이언트 인터랙션을 담당합니다
 *
 * @export
 * @client
 * @param {{children: ReactNode}} {children}
 */
export default function ChatShowOptionModal({
  chatId,
  content,
  options,
  children,
}: {
  chatId: string
  content: string
  options: number
  children: ReactNode
}) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <GestureDetector option='longPress' callback={() => setOpen(true)}>
        {children}
      </GestureDetector>
      {open ? (
        <ModalBackdrop onClick={() => setOpen(false)}>
          <ChatOptionModalContent
            {...{ chatId, content, callback: () => setOpen(false) }}
          />
        </ModalBackdrop>
      ) : (
        <></>
      )}
    </>
  )
}

// TODO: 코드 정리 필요
const ChatOptionModalContent = ({
  chatId,
  content,
  callback,
}: {
  chatId: string
  content: string
  callback: () => void
}) => {
  // 공지등록, 이미 등록된 공지라면 공지해제
  const [confirmMsg, setConfirmMsg] = useState<ReactNode | null>(null)
  const [notice, setNotice] = useRecoilState(ChatNoticeState)
  const isNotice = notice?.chatId === chatId

  const menu = [
    {
      icon: "campaign_rounded",
      text: isNotice ? "공지 해제" : "공지 등록",
      onClick: () => {
        if (isNotice) {
          setConfirmMsg(
            <Stack direction='column' width='100%'>
              <Typography>공지를 해제할까요?</Typography>
              <Stack direction='row' justifyContent='space-evenly'>
                <Button
                  onClick={() => {
                    setConfirmMsg(null)
                    callback()
                  }}
                >
                  취소
                </Button>
                <Button
                  onClick={() => {
                    setNotice(null)
                    setConfirmMsg(null)
                    callback()
                  }}
                >
                  해제
                </Button>
              </Stack>
            </Stack>,
          )
        } else if (notice !== null) {
          setConfirmMsg(
            <Stack direction='column' width='100%'>
              <Typography>
                채팅방 공지는 1건만 등록 가능합니다. 등록할까요?
              </Typography>
              <Stack direction='row' justifyContent='space-evenly'>
                <Button
                  onClick={() => {
                    setConfirmMsg(null)
                    callback()
                  }}
                >
                  취소
                </Button>
                <Button
                  onClick={() => {
                    setChatNotice(chatId).then(res => {
                      if (res.status === 200) {
                        const newNotice: Chat = JSON.parse(res.json())
                        setNotice(newNotice)
                        setConfirmMsg(null)
                        callback()
                      }
                    })
                  }}
                >
                  등록
                </Button>
              </Stack>
            </Stack>,
          )
        } else {
          setChatNotice(chatId).then(res => {
            if (res.status === 200) {
              const newNotice: Chat = JSON.parse(res.json())
              setNotice(newNotice)
              setConfirmMsg(null)
              callback()
            }
          })
        }
      },
    },
    {
      icon: "content_copy",
      text: "내용 복사",
      onClick: () => {
        navigator.clipboard.writeText(content)
        callback()
      },
    },
  ]
  return (
    <>
      <List sx={{ backgroundColor: "white", borderRadius: "0.5rem" }}>
        {menu.map(({ icon, text, onClick }, idx) => (
          <ListItem key={idx}>
            <ListItemButton onClick={onClick}>
              <Stack direction='row' gap='0.5rem'>
                <Icon sx={{ color: "gray" }}>{icon}</Icon>
                <Typography>{text}</Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {confirmMsg ? (
        <ModalBackdrop onClick={() => setConfirmMsg(null)}>
          <Box
            sx={{
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              width: "80vw",
              padding: "0.5rem",
            }}
          >
            {confirmMsg}
          </Box>
        </ModalBackdrop>
      ) : (
        <></>
      )}
    </>
  )
}
