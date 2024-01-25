"use client"
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthenticationProps } from '@/app/utils/types';

const AUTHENTICATION_API = 'http://localhost:3000/user/signup/authentication';
const PHONENUMBER_API = 'http://localhost:3000/user/signup/phone';

export default function Authentication({ onNext, onAuthenticate }: AuthenticationProps) {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);  

  // 1) SMS 전송 버튼 클릭 시
  const handleSMSSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const SMSres = await fetch (PHONENUMBER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phonenumber }),
    })

    // if (SMSres.ok) {
      setShowVerification(true);
    // } else {
    //   alert('올바른 휴대폰 번호를 입력하세요')
    // }
  };

  // 2) 인증번호 확인 버튼 클릭 시
  const handleVerificationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch (AUTHENTICATION_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationCode }),
      })

      if (res.ok) {
        onAuthenticate(true);
        onNext();
      } else {
        alert('올바른 인증번호를 입력하세요')
      }
    } catch (error) {
      alert('올바른 인증번호를 입력하세요')
    }
  };

  // 재전송 버튼 클릭 시
  const handleResend = () => {
    setShowVerification(false);
  };

  // 휴대전화 번호 입력 필드 값이 11자리 이상일 때 버튼 활성화
  const isSMSDisabled = phonenumber.length < 11;
  // 인증 번호 입력 필드 값이 6자리 이상일 때 버튼 활성화
  const isVerificationDisabled = verificationCode.length < 6;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          밥버디 회원가입
        </Typography>
        <Typography mt={1}>
          사용자 인증을 위한 문자가 발송됩니다.
        </Typography>
        <Box component="form" onSubmit={handleSMSSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="phonenumber"
            label="전화번호"
            placeholder="숫자만 입력하세요 ex.010xxxxxxxx"
            type="text"
            id="phonenumber"
            autoComplete="current-phonenumber"
            disabled={showVerification}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={showVerification || isSMSDisabled}
          >
            SMS 전송
          </Button>
        </Box>
        <Box marginTop={2} textAlign="center">
          <Link href="/login" variant="body2">
            이미 계정이 있으신가요? {"로그인"}
          </Link>
        </Box>
        {showVerification && (
          <Box component="form" onSubmit={handleVerificationSubmit} noValidate sx={{ mt: 3, textAlign: 'center', borderTop: '1px solid #D9DADF' }}>
            <Typography mt={5}>
              인증번호 6자리를 입력하세요.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="verificationCode"
              label="인증번호"
              type="text"
              id="verificationCode"
              autoComplete="current-verificationCode"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Grid container columnSpacing={1}>
              <Grid item xs>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick={handleResend}
                >
                  재전송
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isVerificationDisabled}
                >
                  확인
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
