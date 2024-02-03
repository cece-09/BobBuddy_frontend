"use client"
import { useState, useEffect } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link } from "@mui/material"
import { isValidEmail } from "../../utils/validation"

const FORGOT_PASSWORD_API = "http://localhost:3000/mypassword"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)

  // 이메일 상태가 변경될 때마다 유효성 검사
  useEffect(() => {
    setIsEmailValid(isValidEmail(email))
  }, [email])

  // 이메일 전송 버튼 클릭 시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isEmailValid) {
      try {
        const res = await fetch(FORGOT_PASSWORD_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        if (res.ok) {
          // 이메일 전송 성공
          alert("가입 이메일을 확인하세요")
        } else {
          // 이메일 전송 실패
          alert("올바른 이메일을 입력하세요")
        }
      } catch (error) {
        // 네트워크 오류 등
        alert("이메일 요청 중 오류가 발생했습니다. 다시 시도하세요")
      }
    } else {
      alert("올바른 이메일을 입력하세요")
    }
  }

  // 사용자 입력 시 이메일 상태 업데이트
  const handleEmailChange = (event: { target: { value: any } }) => {
    setEmail(event.target.value)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h5'>
          밥버디 비밀번호 찾기
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='이메일'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid && email.length > 0}
            helperText={
              !isEmailValid && email.length > 0
                ? "올바른 이메일을 입력하세요."
                : ""
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
            disabled={!isEmailValid}
          >
            이메일 전송
          </Button>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Link href='/create-account' variant='body2'>
              회원가입
            </Link>
            <Link href='/login' variant='body2'>
              로그인
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
