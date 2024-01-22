import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function FoodPreferenceInfo() {
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
            밥버디 취향 입력 (*선택)
          </Typography>
          <Box
            width={250}
            component="form"
            noValidate onSubmit={handleSubmit}
            sx={{
              display:"flex",
              flexDirection:"column",
              mt: 3,
              gap: 3
              }}
          >
            <FormControl fullWidth>
              <InputLabel id="select">좋아하는 음식</InputLabel>
              <Select
                labelId="select"
                id="select"
                label="좋아하는 음식"
              >
                <MenuItem value={0}>초밥</MenuItem>
                <MenuItem value={1}>삼겹살 </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select">싫어하는 음식</InputLabel>
              <Select
                labelId="select"
                id="select"
                label="싫어하는 음식"
              >
                <MenuItem value={0}>파스타</MenuItem>
                <MenuItem value={1}>돈까스</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>

  );
}