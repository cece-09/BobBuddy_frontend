import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function LocationInfo() {
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            밥버디 위치정보 입력 (*선택)
          </Typography>
          <Typography mt={1}>
            매칭되길 원하는 위치를 입력하세요 (사는 곳/직장)
          </Typography>
          <Box
            width={400}
            component="form"
            noValidate onSubmit={handleSubmit}
            sx={{
              display:"flex",
              gap:1,
              mt: 3,
              }}
          >
            <FormControl fullWidth>
              <InputLabel id="select">지역</InputLabel>
              <Select
                labelId="select"
                id="select"
                label="지역"
              >
                <MenuItem value={0}>서울</MenuItem>
                <MenuItem value={1}>대전 </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select">구</InputLabel>
              <Select
                labelId="select"
                id="select"
                label="구"
              >
                <MenuItem value={0}>광진구</MenuItem>
                <MenuItem value={1}>영등포구</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>

  );
}