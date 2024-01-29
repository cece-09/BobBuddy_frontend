"use client"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const SIGNUP_API = 'http://localhost:3000/signup';

export default function SignupPage() {

  // 회원가입 버튼 클릭 시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(SIGNUP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    });

    if (res.ok) {
      // 회원가입 성공(로그인페이지 리다이렉트)
      window.location.href = '/login'
    } else {
      // 회원가입 실패
      alert('올바른 회원가입 정보를 입력하세요')
    }
    } catch (error) {
      // 네트워크 오류 등
      alert('로그인 요청 중 오류가 발생했습니다. 다시 시도하세요')
    }
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
          밥버디 회원가입
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <Box sx={{ display: 'flex', alignItems:'center' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="button"
              variant="contained"
              sx={{ width: '10px', margin: '10px 0 5px 10px' }}
            >
              인증
            </Button>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repassword"
            label="비밀번호 확인"
            type="password"
            id="repassword"
            autoComplete="current-repassword"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            회원가입
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
            <Link href="/login" variant="body2">
              이미 계정이 있으신가요? {"로그인"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
