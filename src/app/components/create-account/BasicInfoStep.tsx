import { useCallback, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { isValidEmail, isValidPhoneNumber } from '@/app/utils/validation';
import { BasicInfoProps } from '@/app/utils/types';

export default function BasicInfo({ userData, onUserDataChange, onBasicInfoFilled }: BasicInfoProps) {
  const [passwordError, setPasswordError] = useState(false);

  // Input 입력값 업데이트
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onUserDataChange({ [name]: value });

  // 비밀번호 검증 로직
  if (name === 'password' || name === 'repassword') {
    // Check if "repassword" field is being changed
    if (name === 'repassword') {
      setPasswordError(userData.password !== value);
    } else {
      setPasswordError(userData.repassword !== value);
    }
  }
  }, [onUserDataChange, userData.password, userData.repassword]);

  // Select 입력값 업데이트
  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
    const { name, value } = event.target;
    onUserDataChange({ [name]: value });
  }, [onUserDataChange]);

  // 필수 입력 폼 확인
  useEffect(() => {
    const isFilled = !!userData.name &&
      !!userData.gender &&
      !!isValidEmail(userData.email) &&
      !!isValidPhoneNumber(userData.phonenumber) &&
      userData.password.length >= 9 &&
      userData.repassword === userData.password &&
      !passwordError;

    onBasicInfoFilled(isFilled);
  }, [userData, onBasicInfoFilled, passwordError]);

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap:2
          }}
        >
          <Typography component="h1" variant="h5">
            밥버디 회원정보 입력
          </Typography>
          <Box
            noValidate
            component="form"
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: blueGrey, width: 64, height: 64, cursor: 'pointer' }}>
            </Avatar>
            <Box sx={{ display:"flex", marginTop:"30px", gap: "10px" }}>
              <TextField
                fullWidth
                name="name"
                required
                id="name"
                label="이름"
                value={userData.name}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <InputLabel id="gender-label">성별</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  label="성별"
                  name="gender"
                  value={userData.gender}
                  onChange={handleSelectChange}
                  sx={{ width: 100 }}
                >
                  <MenuItem value="남">남</MenuItem>
                  <MenuItem value="여">여</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
              value={userData.email}
              onChange={handleInputChange}
              error={!isValidEmail(userData.email) && userData.email.length > 0}
              helperText={!isValidEmail(userData.email) && userData.email.length > 0 ? '올바른 이메일 형식을 입력하세요.' : ''}
            />
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
              value={userData.phonenumber}
              onChange={handleInputChange}
              error={!isValidPhoneNumber(userData.phonenumber) && userData.phonenumber.length > 0}
              helperText={!isValidPhoneNumber(userData.phonenumber) && userData.phonenumber.length > 0 ? '올바른 휴대전화 번호 형식을 입력하세요.' : ''}
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
              value={userData.password}
              onChange={handleInputChange}
              error={userData.password.length > 0 && userData.password.length < 9}
              helperText={userData.password.length > 0 && userData.password.length < 9 ? '비밀번호는 9자 이상이어야 합니다.' : ''}
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
              value={userData.repassword}
              onChange={handleInputChange}
              error={passwordError}
              helperText={passwordError ? '비밀번호가 일치하지 않습니다.' : ''}
            />
          </Box>
        </Box>
      </Container>

  );
}