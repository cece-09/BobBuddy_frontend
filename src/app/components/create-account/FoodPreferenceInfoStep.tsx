import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FoodPreference, FoodPreferenceInfoProps } from '@/app/utils/types';

const FOOD_OPTIONS: FoodPreference[] = ['족발,보쌈', '돈까스', '회,초밥', '회,초밥', '고기,구이', '피자', '치킨', '버거', '샌드위치, 샐러드', '찜,탕,찌개', '짜장면, 짬뽕', '마라탕', '쌀국수', '백반,죽', '국수', '분식', '카페,디저트'];

export default function FoodPreferenceInfo({ userData, onUserDataChange }: FoodPreferenceInfoProps) {
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
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
            밥버디 취향 입력 (*선택)
          </Typography>
          <Box
            width={250}
            component="form"
            noValidate
            sx={{
              display:"flex",
              flexDirection:"column",
              mt: 3,
              gap: 3
              }}
          >
            <FormControl fullWidth>
              <InputLabel id="likefood">좋아하는 음식</InputLabel>
              <Select
                labelId="likefood"
                id="likefood"
                name="likefood"
                label="좋아하는 음식"
                value={userData.likefood || ""}
                onChange={handleSelectChange}
              >
                {FOOD_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="hatefood">싫어하는 음식</InputLabel>
              <Select
                labelId="hatefood"
                id="hatefood"
                name="hatefood"
                label="싫어하는 음식"
                value={userData.hatefood || ""}
                onChange={handleSelectChange}
              >
                {FOOD_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>

  );
}