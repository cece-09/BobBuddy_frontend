"use client"

import findOpenGraph from "@/app/utils/findOpenGraph"
import { OpenGraph } from "@/types/chat.types"
import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import fetchHTMLFromURL from "../action/fetchHTMLFromURL"
import { useRecoilState } from "recoil"
import chatLoadingState from "../ChatLoadingState"

/**
 * 채팅 메시지에 포함된 링크를
 * 썸네일로 시각화해 렌더링합니다
 *
 * @param {{ url: string }} { url }
 * @return {JSX.Element}
 */
const ChatLinkThum = React.memo(({ url }: { url: string }) => {
  const [_, setLoading] = useRecoilState(chatLoadingState)
  const [thumb, setThumb] = useState<null | OpenGraph>(null)

  useEffect(() => {
    setLoading(true)
    fetchHTMLFromURL(url).then((result: string | null) => {
      if (result === null) {
        setThumb(null)
        setLoading(true)
        return
      }
      const opengraph: OpenGraph = findOpenGraph(result)
      setThumb(opengraph)
      setLoading(false)
    })
  }, [])

  const UI = (
    <Stack
      direction='column'
      width='50vw'
      sx={{
        backgroundColor: "white",
        borderRadius: "0.5em",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "2 / 1",
          background: !thumb
            ? `white`
            : `center no-repeat url('${thumb?.image}')`,
          backgroundSize: "cover",
          borderRadius: "0rem",
        }}
      />
      <Typography
        sx={{
          padding: "0.5rem",
          width: "100%",
          height: "5vh",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {!thumb ? "" : thumb?.title ?? ""}
      </Typography>
    </Stack>
  )

  return !thumb ? (
    <>{UI}</>
  ) : (
    <a href={url} target='_blank'>
      {UI}
    </a>
  )
})

export default ChatLinkThum
