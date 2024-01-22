import * as React from 'react';
import Image from 'next/image';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export default function BasicInfo() {
  const [formData, setFormData] = React.useState({
    avatar: '',
    name: '',
    gender: '',
    email: '',
    phonenumber: '',
    password: '',
    repassword: '',
  });

  // 로그인 버튼 활성화 여부
  const isSubmitDisabled = () => {
    const { name, gender, email, phonenumber, password, repassword } = formData;

    // 모든 필수 입력 필드에 값이 있는지 확인
    return (
      !name || !gender || !email || !phonenumber || !password || !repassword
    );
  };

  // 다음 버튼 클릭 시
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitDisabled()) {
      console.log(formData);
    } else {
      alert('모든 필수 입력 필드를 작성해주세요.');
    }
  };

  // Input 입력값 설정
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Select 입력값 설정
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
            onSubmit={handleSubmit}
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: blueGrey, width: 64, height: 64, cursor: 'pointer' }}>
            {formData.avatar ? (
              <Image
                src={formData.avatar}
                alt="Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              '업로드'
            )}
            </Avatar>
            <Box sx={{ display:"flex", marginTop:"30px", gap: "10px" }}>
              <TextField
                name="name"
                required
                id="name"
                label="이름"
                value={formData.name}
                onChange={handleInputChange}
              />
              <FormControl fullWidth>
                <InputLabel id="gender-label">성별</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  label="성별"
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
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
              name="email"
              label="이메일"
              type="email"
              id="email"
              autoComplete="current-email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phonenumber"
              label="전화번호"
              type="text"
              id="phonenumber"
              autoComplete="current-phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
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
              value={formData.repassword}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
      </Container>

  );
}