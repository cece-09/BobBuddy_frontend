"use client"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const MIN_PASSWORD_LENGTH = 9;
const PASSWORD_VALIDATE_API = 'http://yousayrun.store:8080/user/validate/password'
const PASSWORD_UPDATE_API = 'http://yousayrun.store:8080/user/update/password'

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isNewFormValid, setIsNewFormValid] = useState<boolean>(false);
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState<boolean>(true);
  const [isNewPasswordVerified, setIsNewPasswordVerified] = useState<boolean>(false);

  // 입력 버튼 활성화 여부 판단
  useEffect(() => {
    setIsFormValid(password.length >= MIN_PASSWORD_LENGTH);
    setIsNewFormValid(newpassword.length >= MIN_PASSWORD_LENGTH);
  }, [password, newpassword]);

  // 사용자 입력 시 값 재설정
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'newpassword') {
      setNewpassword(value);
    }
  };

  // 공통 요청 처리 함수
  const handlePasswordRequest = async (apiUrl: string, password: string) => {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          typedPwd: password,
        }),
      });

      if (res.ok) {
        if (apiUrl === PASSWORD_VALIDATE_API) {
          setIsNewPasswordVerified(true);
          setIsOldPasswordVerified(false);
        } else if (apiUrl === PASSWORD_UPDATE_API) {
          window.location.href = '/profile';
        }
      } else {
        throw new Error('서버 에러');
      }
    } catch (error) {
      setIsNewPasswordVerified(true);
      setIsOldPasswordVerified(false);
      alert('요청 중 오류가 발생했습니다. 다시 시도하세요');
    }
  };
  
  // 입력 버튼 클릭 시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePasswordRequest(PASSWORD_VALIDATE_API, password);
  };

  // 저장 버튼 클릭 시
  const handleNewPasswordClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handlePasswordRequest(PASSWORD_UPDATE_API, newpassword);
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
          밥버디 비밀번호 수정
        </Typography>
        {isOldPasswordVerified &&
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            placeholder="기존 비밀번호를 입력하세요"
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
            sx={{ mt: 1 }}
            disabled={!isFormValid}
            >
            입력
          </Button>
        </Box>
        }
        {isNewPasswordVerified &&
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newpassword"
            label="비밀번호 재설정"
            placeholder="새로운 비밀번호를 입력하세요"
            type="password"
            id="newpassword"
            autoComplete="current-newpassword"
            value={newpassword}
            onChange={handleInputChange}
            error={newpassword.length > 0 && newpassword.length < 9}
            helperText={newpassword.length > 0 && newpassword.length < 9 ? '비밀번호는 9자 이상이어야 합니다.' : ''}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            disabled={!isNewFormValid}
            onClick={handleNewPasswordClick}
            sx={{ mt: 1 }}
          >
            저장
          </Button>
          </Box>
          }
      </Box>
    </Container>
  );
}
