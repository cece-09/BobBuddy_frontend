"use client"

import { Chat } from "@/model/chat.model"
import { Paged } from "@/model/paged.model"
import { Box, Button, List, Paper, Stack, TextField } from "@mui/material"
import { ReactNode, useEffect, useRef, useState } from "react"
import ChatMessage from "./_message"

/**
 *
 * @client
 * @param {{ children: ReactNode }} { children }
 * @return {*}
 */
export default function ChatViewClient({ children }: { children: ReactNode }) {
  const [chat, setChat] = useState<Paged<Chat> | null>(null)
  const [newChat, setNewChat] = useState<Chat[]>([])
  const [message, setMessage] = useState<string>("")

  const sendChat = () => {
    const chat = new Chat(null, null, message, new Date().toISOString(), false)
    newChat.push(chat)
    setNewChat([...newChat])
    setMessage("")
  }

  return (
    <>
      <Stack
        direction='row'
        sx={{
          backgroundColor: "yellow",
          justifyContent: "space-between",
        }}
      >
        <div>back</div>
        <div>chat room name</div>
        <div>menu</div>
      </Stack>
      <Box sx={{ pb: 7 }}>
        {children}
        <>
          {newChat.map(nc => {
            const date = new Date(nc.timestamp)
            return (
              <ChatMessage
                message={nc.message}
                time={`${date.getHours()}:${date.getMinutes()}`}
              />
            )
          })}
        </>
        <Stack
          direction='row'
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <TextField
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                sendChat()
              }
            }}
          />
          <Button onClick={() => sendChat()}>send</Button>
        </Stack>
      </Box>
    </>
  )
}
