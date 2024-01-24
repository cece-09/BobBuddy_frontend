import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { MBTIType, MBTIInfoProps } from '@/app/utils/types';

export default function MBTIInfo({ userData, onUserDataChange }: MBTIInfoProps) {
  const handleSelectChange = (event: SelectChangeEvent<MBTIType>) => {
    const { name, value } = event.target;
    onUserDataChange({ [name]: value });
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
          <Box width={300} component="form" noValidate sx={{ mt: 5 }}>
            <FormControl fullWidth>
              <InputLabel id="select">MBTI</InputLabel>
              <Select
                labelId="select"
                id="select"
                name="mbti"
                label="MBTI"
                value={userData.mbti as MBTIType}
                onChange={handleSelectChange}
              >
                <MenuItem value="ISFJ">ISFJ</MenuItem>
                <MenuItem value="ISTJ">ISTJ</MenuItem>
                <MenuItem value="INFJ">INFJ</MenuItem>
                <MenuItem value="INTJ">INTJ</MenuItem>
                <MenuItem value="ISFP">ISFP</MenuItem>
                <MenuItem value="ISTP">ISTP</MenuItem>
                <MenuItem value="INFP">INFP</MenuItem>
                <MenuItem value="INTP">INTP</MenuItem>
                <MenuItem value="ESFP">ESFP</MenuItem>
                <MenuItem value="ESTP">ESTP</MenuItem>
                <MenuItem value="ENFP">ENFP</MenuItem>
                <MenuItem value="ENTP">ENTP</MenuItem>
                <MenuItem value="ESFJ">ESFJ</MenuItem>
                <MenuItem value="ESTJ">ESTJ</MenuItem>
                <MenuItem value="ENFJ">ENFJ</MenuItem>
                <MenuItem value="ENTJ">ENTJ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>

  );
}