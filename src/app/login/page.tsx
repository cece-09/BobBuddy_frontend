'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { isValidEmail } from '../../utils/validation';
import { MIN_PASSWORD_LENGTH } from '../../constants/user.constants';
import { requestSignIn } from '@/server/auth';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // 로그인 버튼 클릭 시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = {
      userEmail: email,
      pwd: password,
    };

    const response = await requestSignIn(body);
    if (response) {
      window.location.href = '/home';
    } else if (response === false) {
      alert('올바른 로그인 정보를 입력하세요');
    } else {
      alert('로그인 요청 중 오류가 발생했습니다. 다시 시도하세요');
    }

    // try {
    //   const res = await fetch(SIGNIN_API, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       userEmail: email,
    //       pwd: password,
    //     }),
    //   })

    //   if (res.ok) {
    //     // 로그인 성공 (메인페이지 리다이렉트)
    //     window.location.href = "/home"
    //   } else {
    //     // 로그인 실패
    //     alert("올바른 로그인 정보를 입력하세요")
    //   }
    // } catch (error) {
    //   // 네트워크 오류 등
    //   alert("로그인 요청 중 오류가 발생했습니다. 다시 시도하세요")
    // }
  };

  // 로그인 버튼 활성화 여부 판단
  useEffect(() => {
    setIsFormValid(
      isValidEmail(email) && password.length >= MIN_PASSWORD_LENGTH,
    );
  }, [email, password]);

  // 사용자 입력 시 값 재설정
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
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
        <Typography component='h1' variant='h5'>
          밥버디 로그인
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
            onChange={handleInputChange}
            error={!isValidEmail(email) && email.length > 0}
            helperText={
              !isValidEmail(email) && email.length > 0
                ? '올바른 이메일 형식을 입력하세요.'
                : ''
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='비밀번호'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={handleInputChange}
            error={password.length > 0 && password.length < 9}
            helperText={
              password.length > 0 && password.length < 9
                ? '비밀번호는 9자 이상이어야 합니다.'
                : ''
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
            disabled={!isFormValid}
          >
            로그인
          </Button>
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <a href='https://yousayrun.store/auth/sign-in/kakao'>
              <Image
                src='/assets/kakao.png'
                width={50}
                height={50}
                alt='Kakao Login'
              />
            </a>
            <a href='https://yousayrun.store/auth/sign-in/naver'>
              <Image
                src='/assets/naver.png'
                width={57}
                height={57}
                alt='Naver Login'
              />
            </a>
          </Box>
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Link href='/create-account' variant='body2'>
              아직 계정이 없으신가요? {'회원가입'}
            </Link>
            <Link href='/forgot-password' variant='body2'>
              비밀번호를 잊으셨나요?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
