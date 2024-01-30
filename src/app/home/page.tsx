"use client"

import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import reverseGeocoding from "../components/home/action/reverseGeocoding"
import { error } from "console"

// function useMatchOption() {
//     const [location, setLocation] = useState
// }

export default function HomePage() {
  return (
    <Stack
      direction='column'
      padding='2rem 1rem'
      justifyContent='space-around'
      height='100%'
    >
      <Stack direction='column' gap={8}>
        <div style={{ marginBottom: 8 }}>
          <Typography mb={2} sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
            위치 설정
          </Typography>
          <LocationSearchBar />
        </div>
        <div style={{ marginBottom: 8 }}>
          <Typography mb={2} sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
            인원 설정
          </Typography>
          <MatchNumInput />
        </div>
      </Stack>
      <MatchButton />
    </Stack>
  )
}

const PRIMARY_COLOR = "#5E1EE7"

const MatchButton = () => {
  const GRADIENT_COLOR = `linear-gradient(95deg, #5E1EE7 13.09%, #7718C1 100%)`
  const handleClick = () => {
    // TODO: 매칭 API 콜
  }
  return (
    <Button
      sx={{
        alignSelf: "center",
        background: GRADIENT_COLOR,
        borderRadius: "5rem",
        width: "80vw",
        aspectRatio: "7 / 2",
      }}
    >
      <Typography color='white' sx={{ fontSize: "1.5rem", fontWeight: 800 }}>
        랜덤 매칭
      </Typography>
    </Button>
  )
}

const MatchNumInput = () => {
  const [focus, setFocus] = useState<number>(0)
  const matchOption = ["Large", "Medium", "Small"]

  // 좌우 이동 버튼 클릭시
  const handleClick = (option: "prev" | "next") => {
    if (option === "prev" && focus > 0) {
      setFocus(focus - 1)
    } else if (focus < matchOption.length - 1) {
      setFocus(focus + 1)
    }
  }

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      gap={1}
      width='100%'
    >
      <IconButton
        onClick={() => handleClick("prev")}
        sx={{ backgroundColor: PRIMARY_COLOR }}
      >
        <Icon sx={{ color: "white" }}>remove_rounded</Icon>
      </IconButton>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          borderRadius: "100%",
          backgroundColor: "white",
          width: "40vw",
          aspectRatio: "1 / 1",
        }}
      >
        {matchOption[focus]}
      </Stack>
      <IconButton
        onClick={() => handleClick("next")}
        sx={{ backgroundColor: PRIMARY_COLOR }}
      >
        <Icon sx={{ color: "white" }}>add_rounded</Icon>
      </IconButton>
    </Stack>
  )
}

const LocationSearchBar = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [addr, setAddr] = useState<string | null>(null)
  useEffect(() => {
    if ("geolocation" in navigator) getCurrAddr()
  }, [])

  // 우측 트레일링 버튼
  const searchbarButtons = [
    { icon: "my_location_rounded", onClick: () => getCurrAddr() },
    { icon: "search_rounded", onClick: () => {} },
  ]

  // 현위치 버튼 클릭했을때 실행
  const getCurrAddr = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      // 좌표값으로 리버스 지오코딩 실행하여 주소 문자열로 변환
      reverseGeocoding(longitude, latitude)
        .then(addr => setAddr(addr))
        .catch((error: Error) => console.error(error))
        .finally(() => setLoading(false))
    })
  }

  // 검색 버튼 클릭했을때 실행
  const searchAddr = () => {
    // 검색 문자열이 없으면 패스
    // 아니면 네이버 지도에서 검색해오기
  }

  return (
    <Stack
      direction='row'
      padding='0.5rem 0.8rem'
      sx={{
        borderRadius: "1rem",
        backgroundColor: "white",
      }}
      gap={1}
    >
      {loading ? (
        <Skeleton width='100%' />
      ) : (
        <Input
          value={addr ?? ""}
          placeholder={addr === null && !loading ? "어디에서 만날까요?" : ""}
          disableUnderline={true}
          sx={{
            width: "100%",
            margin: 0,
            outline: "none",
            borderBottom: "0px",
          }}
        />
      )}
      {["my_location_rounded", "search_rounded"].map((each, idx) => (
        <IconButton key={idx} sx={{ backgroundColor: PRIMARY_COLOR }}>
          <Icon sx={{ color: "white" }}>{each}</Icon>
        </IconButton>
      ))}
    </Stack>
  )
}
