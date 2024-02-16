"use client"

import {
  Button,
  Divider,
  Icon,
  IconButton,
  Input,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material"
import {
  getAddrByKeyword,
  reverseGeocoding,
} from "@/server-actions/home.actions"
import { useEffect, useState } from "react"
import { ModalBackdrop } from "@/components/common/ModalBackdrop"
import { TextQueryResult } from "@/types/home.types"
import { theme } from "@/styles/theme"
import { createInterceptor } from "@/utils/interceptor"

export default function HomePage() {
  return (
    <Stack
      direction='column'
      padding='2rem 1rem'
      height='100vh'
      pb='10vh'
      sx={{
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <Stack direction='column' mb={15}>
        <Typography mb={2} sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          위치 설정
        </Typography>
        <LocationSearchBar />
        <Typography mt={8} mb={4} sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          인원 설정
        </Typography>
        <MatchNumInput />
      </Stack>
      <MatchButton />
    </Stack>
  )
}

const MatchButton = () => {
  const GRADIENT_COLOR = `linear-gradient(95deg, #5E1EE7 13.09%, #7718C1 100%)`
  // 버튼 클릭에서 에러 발생시 실행
  const handleError = (msg?: string) => {
    alert(msg ?? "match error!")
    // window.location.href = "/"
  }

  // 버튼 클릭 시 실행
  const handleClick = async () => {
    // TODO: match api 연결
    const interceptor = createInterceptor<any>()
    const data = interceptor({ url: `/match/request`, method: "POST" })
  }
  return (
    <Button
      onClick={handleClick}
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

  // TODO: contants로 빼기
  type matchOptionType = {
    text: string
    subtext: string
    image?: string
  }
  const matchOption: matchOptionType[] = [
    {
      text: "Small",
      subtext: "2-3명의 소규모 모임",
    },
    {
      text: "Medium",
      subtext: "4-6명의 즐거운 식사",
    },
    {
      text: "Large",
      subtext: "7명이상의 파티",
    },
  ]

  // 좌우 이동 버튼 클릭시
  const handleClick = (option: "prev" | "next") => {
    if (option === "prev" && focus > 0) {
      setFocus(focus - 1)
    } else if (option === "next" && focus < matchOption.length - 1) {
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
      <PrimaryIconButton onClick={() => handleClick("prev")}>
        <Icon>remove_rounded</Icon>
      </PrimaryIconButton>
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
        <Typography sx={{ fontWeight: 600 }}>
          {matchOption[focus].text}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
          {matchOption[focus].subtext}
        </Typography>
      </Stack>
      <PrimaryIconButton onClick={() => handleClick("next")}>
        <Icon>add_rounded</Icon>
      </PrimaryIconButton>
    </Stack>
  )
}

/**
 * 위치 검색창 컴포넌트
 *
 * @return {JSX.Element}
 */
const LocationSearchBar = (): JSX.Element => {
  // 상태관리
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState<string>("") // 서버로 넘길 주소문자열

  // 우측 트레일링 버튼 리스트 상수
  // TODO: 분리
  const searchbarButtons = [
    { icon: "my_location_rounded", onClick: () => getCurrAddr() },
    { icon: "search_rounded", onClick: () => toggle() },
  ]

  // 검색창 열기/닫기 토글
  const toggle = () => {
    if (open) setOpen(false)
    else setOpen(true)
  }

  // 마운트되면 즉시 현위치 기반으로 주소를 불러옵니다
  useEffect(() => {
    if ("geolocation" in navigator) getCurrAddr()
  }, [])

  // 메인화면 최초 마운트 or 현위치 버튼 클릭했을때 실행
  const getCurrAddr = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(setPosition, positionError)

    // 좌표값으로 리버스 지오코딩 실행하여 주소 문자열로 변환
    function setPosition(position: GeolocationPosition) {
      const { longitude, latitude } = position.coords
      reverseGeocoding(longitude, latitude)
        .then(addr => {
          setLocation(addr ?? "")
        })
        .catch((error: Error) => console.error(error))
        .finally(() => setLoading(false))
    }

    // 변환 실패 시 에러 처리
    function positionError(error: GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // TODO: 위치를 허용하세요 모달 노출
          console.error("User denied the request for Geolocation")
          break
        case error.POSITION_UNAVAILABLE:
          console.error("User denied the request for Geolocation")
          break
        case error.TIMEOUT:
          console.error("User denied the request for Geolocation")
          break
        default:
          console.error(error.message)
      }
    }
  }

  return (
    <>
      <Stack
        direction='row'
        padding='0.5rem 0.8rem'
        sx={{
          width: "100%",
          borderRadius: "1rem",
          backgroundColor: "white",
          justifyContent: "end",
          alignItems: "center",
        }}
        gap={1}
      >
        {loading ? (
          <Skeleton width='100%' />
        ) : (
          <div
            onClick={toggle}
            style={{
              width: "100%",
              margin: 0,
              color: location === "" ? "gray" : "inherit",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {location === "" && !loading ? "어디에서 만날까요?" : location}
          </div>
        )}
        {searchbarButtons.map(({ icon, onClick }, idx) => (
          <PrimaryIconButton key={idx} onClick={onClick}>
            <Icon>{icon}</Icon>
          </PrimaryIconButton>
        ))}
      </Stack>
      {open ? (
        <LocationSearchModal
          initValue={location}
          onBackClick={toggle}
          onSelect={(target: string) => {
            setLocation(target)
            toggle()
          }}
        />
      ) : (
        <></>
      )}
    </>
  )
}

/**
 * 위치검색창 클릭시 노출되는 모달
 * @param   initValue
 * @param   quertyResult
 * @param   onChange
 * @param   onSelect
 * @param   onBackClick
 * @returns JSX.Element
 */
const LocationSearchModal = ({
  initValue,
  onSelect,
  onBackClick,
}: {
  initValue: string
  onSelect: (str: string) => void
  onBackClick: () => void
}): JSX.Element => {
  const [input, setInput] = useState<string>(initValue)
  const debouncedInput = useDebounce(input, 1000) // 1초 디바운스 사용
  const queryResult = useAutoComplete(debouncedInput)

  return (
    <ModalBackdrop onClick={onBackClick}>
      <Stack
        direction='column'
        sx={{
          backgroundColor: "white",
          width: "100vw",
          padding: "0.5rem",
          zIndex: 10,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Stack direction='row'>
          <IconButton onClick={onBackClick}>
            <Icon>arrow_back_ios</Icon>
          </IconButton>
          <Input
            value={input}
            placeholder={input === "" ? "어디에서 만날까요?" : ""}
            disableUnderline={true}
            onChange={e => setInput(e.target.value)}
            sx={{
              width: "100%",
              margin: 0,
              outline: "none",
              borderBottom: "0px",
            }}
          />
        </Stack>
        {queryResult.map((query, idx) => (
          <div key={idx} onClick={() => onSelect(query.displayName.text)}>
            <Divider />
            <Stack
              sx={{
                width: "100%",
                padding: "0.5rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Typography>{query.displayName.text ?? ""}</Typography>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "gray",
                }}
              >
                {query.formattedAddress}
              </Typography>
            </Stack>
          </div>
        ))}
      </Stack>
      <Stack
        sx={{
          width: "100%",
          textAlign: "center",
          justifyContent: "center",
          borderRadius: "0.5rem",
          padding: "0.5rem",
        }}
      >
        <Typography
          sx={{ fontSize: "0.8rem", color: "white", fontWeight: 600 }}
        >
          현재 서울특별시만 서비스됩니다
        </Typography>
      </Stack>
    </ModalBackdrop>
  )
}

// ====== Custom Hooks ====== //
// TODO: 파일 분리
// 사용자의 입력이 delay보다 길게 중단될 경우에만
// debounceValue로 실제 API요청할 검색어를 세팅합니다.
const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceValue
}

// 입력된 값으로 자동완성 목록을 fetch
const useAutoComplete = (keyword: string) => {
  const [queryResult, setQueryResult] = useState<TextQueryResult[]>([])

  useEffect(() => {
    keyword.trim()
    if (keyword === "") {
      return // 빈칸이면 제외
    }
    getAddrByKeyword(keyword)
      .then(result => {
        setQueryResult(result)
      })
      .catch((error: Error) => {
        console.error(error)
      })
  }, [keyword])

  return queryResult
}

/* ======= Styling ======= */
// TODO: 파일 분리?
const PrimaryIconButton = styled(IconButton)(() => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}))
