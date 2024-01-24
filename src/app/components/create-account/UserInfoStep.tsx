import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Button, styled } from '@mui/material';
import { UserData } from '@/app/utils/types';

const SIGNUP_API = 'http://localhost:3000/user/signup';

const Item = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  width: 300,
  height: 40,
});

const UserInfo: React.FC<{ userData: UserData }> = ({ userData }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(SIGNUP_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData })
      });

      if (res.ok) {
        window.location.href = '/login';
      } else {
        alert('회원가입에 실패했습니다. 정보를 추가로 입력하세요');
      }
    } catch (error) {
      alert('네트워크 오류로 회원가입에 실패했습니다. 다시 시도하세요');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          밥버디 회원정보 확인
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Item variant="outlined">{userData.name}</Item>
          <Item variant="outlined">{userData.gender}</Item>
          <Item variant="outlined">{userData.email}</Item>
          <Item variant="outlined">{userData.phonenumber}</Item>
          <Item variant="outlined">{userData.mbti}</Item>
          <Item variant="outlined">{userData.likefood}</Item>
          <Item variant="outlined">{userData.hatefood}</Item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            >
            회원가입
          </Button>
          </Box>
      </Box>
    </Container>
  );
}

export default UserInfo;