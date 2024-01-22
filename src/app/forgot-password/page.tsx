"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';

export default function ResetPassword() {
  const [email, setEmail] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  
  // 이메일 전송 버튼 클릭 시
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmailValid) {
      // 이메일 전송 로직 추가
      console.log('이메일을 전송합니다.');
    } else {
      alert('올바른 이메일을 입력하세요.');
    }
  };

  // 이메일 형식 검증
  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // 사용자 입력 시 state 재설정
  const handleEmailChange = (event: { target: { value: any; }; }) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          밥버디 비밀번호 찾기
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid && email.length > 0}
            helperText={!isEmailValid && email.length > 0 ? '올바른 이메일을 입력하세요.' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
              marginTop: 3
            }}
          >
            <Link href="/create-account" variant="body2">
              회원가입
            </Link>
            <Link href="/login" variant="body2">
              로그인
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
