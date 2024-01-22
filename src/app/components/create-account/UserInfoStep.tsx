import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Button, styled } from '@mui/material';

const Item = styled(Paper)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  width: 300,
  height: 40,
});

export default function UserInfo() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          <Item variant="outlined">이름</Item>
          <Item variant="outlined">성별</Item>
          <Item variant="outlined">이메일</Item>
          <Item variant="outlined">전화번호</Item>
          <Item variant="outlined">MBTI</Item>
          <Item variant="outlined">지역</Item>
          <Item variant="outlined">구</Item>
          <Item variant="outlined">좋아하는 음식</Item>
          <Item variant="outlined">싫어하는 음식</Item>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          회원가입
        </Button>
      </Box>
    </Container>
  );
}