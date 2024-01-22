"use client"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function SigninPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  // 로그인 버튼 클릭 시
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidEmail(email) && password.length >= 9) {
      console.log({
        email,
        password,
      });
      // 백엔드 요청 로직 추가
    } else {
      alert('올바른 로그인 정보를 입력하세요');
    }
  };

  // 이메일 형식 검증
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // 사용자 입력 시 state 재설정
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    validateForm();
  };

  // 이메일과 비밀번호 알맞게 입력한 경우 true로 설정
  const validateForm = () => {
    setIsFormValid(isValidEmail(email) && password.length >= 9);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          밥버디 로그인
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
            onChange={handleInputChange}
            error={!isValidEmail(email) && email.length > 0}
            helperText={!isValidEmail(email) && email.length > 0 ? '올바른 이메일 형식을 입력하세요.' : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
            error={password.length > 0 && password.length < 9}
            helperText={password.length > 0 && password.length < 9 ? '비밀번호는 9자 이상이어야 합니다.' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!isFormValid}
          >
            로그인
          </Button>
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3
            }}
          >
            <Link href="/create-account" variant="body2">
              아직 계정이 없으신가요? {"회원가입"}
            </Link>
            <Link href="/forgot-password" variant="body2">
              비밀번호를 잊으셨나요?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
