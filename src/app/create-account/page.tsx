"use client"
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { isValidEmail } from '../utils/validation';

const MIN_PASSWORD_LENGTH = 9;
const SIGNUP_API = 'http://yousayrun.store:8080/user/signup';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const { name, email, password, repassword } = formData;

  // 이메일, 비밀번호 유효성 검증
  useEffect(() => {
    setIsFormValid(
      isValidEmail(email) && 
      password.length >= MIN_PASSWORD_LENGTH && 
      password === repassword
    );
  }, [email, password, repassword]);

  // 입력 필드에 따라 상태 업데이트
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // 회원가입 버튼 클릭 시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(SIGNUP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: email,
        userName: name,
        pwd: password,
      }),
    });

    if (res.ok) {
      // 회원가입 성공
      console.log(res.json())
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
            value={name}
            onChange={handleInputChange}
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
              value={email}
              onChange={handleInputChange}
              error={!isValidEmail(email) && email.length > 0}
              helperText={!isValidEmail(email) && email.length > 0 ? '올바른 이메일 형식을 입력하세요.' : ''}
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
            value={password}
            onChange={handleInputChange}
            error={password.length > 0 && password.length < MIN_PASSWORD_LENGTH}
            helperText={password.length > 0 && password.length < MIN_PASSWORD_LENGTH ? '비밀번호는 9자 이상이어야 합니다.' : ''}
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
            value={repassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!isFormValid}
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
