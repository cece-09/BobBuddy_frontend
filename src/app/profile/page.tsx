'use client';
import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Container,
  CssBaseline,
  Link,
  Typography,
} from '@mui/material';
import { User } from '../../components/profile/UpdateSheet';
import BottomSheet from '../../components/profile/UpdateSheet';
import { UserContext } from '@/providers/UserProvider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#BDBDBD',
  ...theme.typography.body2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  minHeight: '50px',
  color: theme.palette.text.secondary,
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
}));

const UpdateItem: any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  minHeight: '50px',
  color: theme.palette.text.secondary,
  fontSize: '16px',
  '&:hover': {
    transform: 'scale(1.1)',
    cursor: 'pointer',
  },
}));

const ProfilePage = () => {
  const { user, setUserData } = useContext(UserContext);
  const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<keyof User | null>(null);
  const [updatedProfileData, setUpdatedProfileData] = useState<User | null>(
    null,
  );

  // 프로필 업데이트 아이템 클릭 시 해당 아이템을 선택하고 BottomSheet 열기
  const handleUpdateItemClick = (item: keyof User) => {
    setSelectedItem(item);
    setBottomSheetOpen(true);
  };

  // BottomSheet에서 업데이트된 프로필 데이터를 받아와 상태 업데이트
  const handleSaveProfileData = (updatedData: User) => {
    setUpdatedProfileData(updatedData);

    // Recoil 상태 업데이트
    setUserData(prevUser => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    user.userData && (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            my: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <Typography component='h1' variant='h5'>
            밥버디 회원정보
          </Typography>
          <Avatar
            alt='프로필 사진'
            src=''
            sx={{
              width: '60px',
              height: '60px',
              '&:hover': {
                transform: 'scale(1.1)',
                cursor: 'pointer',
              },
            }}
          ></Avatar>
          <Box sx={{ width: '90%' }}>
            <Stack spacing={3}>
              <Item>{user.userData.username}</Item>
              <Item>{user.userData.email}</Item>
              <UpdateItem onClick={() => handleUpdateItemClick('birth')}>
                생년월일: {user.userData.birth}
              </UpdateItem>
              <UpdateItem onClick={() => handleUpdateItemClick('gender')}>
                성별: {user.userData.gender}
              </UpdateItem>
              <UpdateItem onClick={() => handleUpdateItemClick('mbti')}>
                MBTI: {user.userData.mbti}
              </UpdateItem>
              <UpdateItem onClick={() => handleUpdateItemClick('favoriteFood')}>
                좋아하는 음식: {user.userData.favoriteFood}
              </UpdateItem>
              <UpdateItem onClick={() => handleUpdateItemClick('dislikedFood')}>
                싫어하는 음식: {user.userData.dislikedFood}
              </UpdateItem>
            </Stack>
          </Box>
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Link href='/change-password' variant='body2'>
              비밀번호 수정
            </Link>
          </Box>
        </Box>
        <BottomSheet
          open={bottomSheetOpen}
          onClose={() => setBottomSheetOpen(false)}
          item={selectedItem}
          onSaveButtonClick={handleSaveProfileData}
        />
      </Container>
    )
  );
};

export default ProfilePage;
