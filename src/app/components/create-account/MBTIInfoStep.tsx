import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function MBTIInfo() {
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
            밥버디 MBTI 입력 (*선택)
          </Typography>
          <Box width={300} component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="select">MBTI</InputLabel>
              <Select
                labelId="select"
                id="select"
                label="MBTI"
              >
                <MenuItem value={0}>ISFJ</MenuItem>
                <MenuItem value={1}>ISTJ</MenuItem>
                <MenuItem value={2}>INFJ</MenuItem>
                <MenuItem value={3}>INTJ</MenuItem>
                <MenuItem value={4}>ISFP</MenuItem>
                <MenuItem value={5}>ISTP</MenuItem>
                <MenuItem value={6}>INFP</MenuItem>
                <MenuItem value={7}>INTP</MenuItem>
                <MenuItem value={8}>ESFP</MenuItem>
                <MenuItem value={9}>ESTP</MenuItem>
                <MenuItem value={10}>ENFP</MenuItem>
                <MenuItem value={11}>ENTP</MenuItem>
                <MenuItem value={12}>ESFJ</MenuItem>
                <MenuItem value={13}>ESTJ</MenuItem>
                <MenuItem value={14}>ENFJ</MenuItem>
                <MenuItem value={15}>ENTJ </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>

  );
}