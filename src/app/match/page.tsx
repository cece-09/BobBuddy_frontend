import { Chat } from "@/types/chat.types"
import {
  Box,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material"

class Match {
  id: string
  title: string
  time: string
  userProfiles: string[]
  recentChat?: Chat

  constructor(
    title: string,
    time: string,
    userProfiles: string[],
    recentChat?: Chat,
    id?: string,
  ) {
    this.id = "1"
    this.title = title
    this.time = time
    this.userProfiles = userProfiles
    this.recentChat = new Chat(
      "1",
      "1",
      "가장 최근 채팅을 노출합니다.",
      new Date().getTime(),
    )
  }
}

type MatchPageData = {
  point: number
  match: Match[]
}

// server action
async function getData(): Promise<MatchPageData> {
  // 유저가 가입된 매칭방 데이터 fetch
  return {
    point: 78,
    match: [
      new Match("2월 18일 저녁", new Date().toISOString(), ["", "", "", ""]),
    ],
  }
}

export default async function MatchPage() {
  const { point, match } = await getData()

  return (
    <Stack sx={{ width: "100%", height: "100vh", padding: "2rem 1rem" }}>
      <Typography mb={2} sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        매칭방
      </Typography>
      <Typography my={1} sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
        나의 매너온도
      </Typography>
      <MyPointView {...{ point }} />
      <Typography my={1} sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
        오늘의 밥버디 매칭
      </Typography>
      {match.map((mat, idx) => (
        <MatchCard key={idx} match={mat} />
      ))}
    </Stack>
  )
}

const MatchCard = ({ match }: { match: Match }) => {
  const { title, time, userProfiles, recentChat } = match
  return (
    <Stack
      direction='column'
      sx={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        padding: "0.5rem 1rem",
      }}
    >
      <Stack direction='row'>
        <Typography fontWeight={600}>{title}</Typography>
      </Stack>
    </Stack>
  )
}

const MyPointView = ({ point }: { point: number }) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: "100%",
        borderRadius: "0.5rem",
        backgroundColor: "white",
        padding: "4rem 1rem 1rem 1rem",
        alignItems: "end",
      }}
    >
      {[
        { width: point, color: "blue" },
        { width: 1, color: "red" },
        { width: 99 - point, color: "gray" },
      ].map(({ width, color }, idx) => {
        if (idx === 1) {
          return (
            <Stack
              key={idx}
              sx={{
                width: `${0.5}%`,
                height: "5vh",
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Stack
                sx={{
                  width: "3rem",
                  borderRadius: "100%",
                  position: "absolute",
                  bottom: "2.5rem",
                  aspectRatio: "1 / 1",
                  backgroundColor: "red",
                  color: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {point}
              </Stack>
            </Stack>
          )
        } else {
          return (
            <Box
              key={idx}
              sx={{
                backgroundColor: color,
                width: `${width}%`,
                height: "2.5vh",
                borderRadius: "0.5rem",
              }}
            />
          )
        }
      })}
    </Stack>
  )
}
