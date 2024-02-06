import { Chat } from "@/types/chat.types"
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import Link from "next/link"

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
  history: Match[]
}

// server action
async function getData(): Promise<MatchPageData> {
  // 유저가 가입된 매칭방 데이터 fetch
  return {
    point: 78,
    match: [
      new Match("2월 18일 저녁", new Date().toISOString(), ["", "", "", ""]),
    ],
    history: [
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
      new Match("2월 16일 저녁", new Date().toISOString(), ["", "", ""]),
    ],
  }
}

export default async function MatchPage() {
  const { point, match, history } = await getData()

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
        매칭방
      </Typography>
      <Typography my={1} sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
        나의 매너온도
      </Typography>
      <MyPointView {...{ point }} />
      <Typography mt={4} mb={1} sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
        현재 참여중인 매칭방
      </Typography>
      <MatchList match={match} />
      <Typography mt={4} mb={1} sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
        매칭 히스토리
      </Typography>
      <List>
        {history.map((each, idx) => {
          return (
            <Stack
              key={idx}
              padding='0.5rem'
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{ backgroundColor: "white", mb: 1, borderRadius: "0.5rem" }}
            >
              <Typography>{each.title}</Typography>
              <ProfileBox profiles={each.userProfiles} />
            </Stack>
          )
        })}
      </List>
    </Stack>
  )
}

const ProfileBox = ({ profiles }: { profiles: string[] }) => {
  // 4개로 맞추기
  if (profiles.length < 4) {
    const tmp = Array.from({ length: 4 - profiles.length }, () => "")
    profiles = profiles.concat(tmp)
  } else if (profiles.length > 4) {
    profiles = profiles.slice(0, 5)
  }
  return (
    <Stack
      direction='column'
      sx={{ borderRadius: "0.2rem", overflow: "hidden" }}
    >
      {profiles.map((_, idx) =>
        idx % 2 === 0 ? (
          <Stack key={idx} direction='row'>
            {profiles.slice(idx, idx + 2).map((url, k) => (
              <Avatar
                key={k}
                variant='square'
                alt={url}
                src={url}
                sx={{
                  width: "30px",
                  height: "30px",
                }}
              />
            ))}
          </Stack>
        ) : (
          <></>
        ),
      )}
    </Stack>
  )
}

const MatchList = ({ match }: { match: Match[] }) => {
  const placeholder = (
    <Stack
      justifyContent='center'
      alignItems='center'
      height='10vh'
      borderRadius='0.5rem'
      sx={{ backgroundColor: "white" }}
    >
      <Typography fontSize='0.9rem' color='#666'>
        매칭이 없습니다
      </Typography>
    </Stack>
  )
  return (
    <>
      {match
        ? match.map((each, idx) => <MatchCard key={idx} match={each} />)
        : placeholder}
    </>
  )
}

const MatchCard = ({ match }: { match: Match }) => {
  const { id, title, time, userProfiles, recentChat } = match
  const formatDate = (date: Date) => {
    const MM = date.getMonth()
    const dd = date.getDate()
    const hh = date.getHours()
    const ee = hh > 12 ? "오후" : "오전"
    const mm = date.getMinutes()
    return `${MM + 1}월 ${dd}일 ${ee} ${hh > 12 ? hh - 12 : hh}시 ${mm}분`
  }

  return (
    <Link href={`/chat/${id}`}>
      <Stack
        direction='column'
        sx={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
        }}
      >
        <Stack direction='column'>
          <Typography fontWeight={600}>{`${formatDate(
            new Date(time),
          )} 모임`}</Typography>
          <Typography fontSize='0.8rem'>{recentChat?.content}</Typography>
        </Stack>
        <AvatarGroup max={3} total={userProfiles.length}>
          {userProfiles.map((url, idx) => (
            <Avatar key={idx} alt={url} src={url} sizes='sm' />
          ))}
        </AvatarGroup>
      </Stack>
    </Link>
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
