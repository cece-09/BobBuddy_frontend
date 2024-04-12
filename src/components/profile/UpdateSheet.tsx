import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Button, TextField } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userState } from '../../providers/userAtom';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  item: keyof User | null;
  onSaveButtonClick: (updatedData: User) => void;
}

export interface User {
  userId: number;
  userImg: string;
  username: string;
  email: string;
  birth: string;
  gender: string;
  mbti: string;
  favoriteFood: string;
  dislikedFood: string;
}

const PROFILE_UPDATE_API = 'http://yousayrun:8080/user/profile/update';

const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  item,
  onSaveButtonClick,
}) => {
  // Recoil을 사용하여 사용자 상태 관리
  const [user, setUser] = useRecoilState(userState);
  // 수정 모드 여부를 관리하는 상태
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // 입력값을 관리하는 상태
  const [inputValue, setInputValue] = useState<string>('');

  // 컴포넌트가 마운트되거나 선택된 아이템이 변경될 때 실행되는 효과
  useEffect(() => {
    if (item) {
      const value = user.userData[item];
      setInputValue(typeof value === 'number' ? value.toString() : value || '');
    }
  }, [item, user.userData]);

  const handleSaveClick = async () => {
    if (item) {
      try {
        const dataToUpdate = {
          [item]: inputValue,
        };

        // 프로필 업데이트를 위해 서버에 PATCH 요청을 보냄
        const response = await fetch(PROFILE_UPDATE_API, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToUpdate),
        });

        if (response.ok) {
          // 서버에서 업데이트된 데이터를 받아옴
          const updatedData: User = await response.json();

          // onSaveButtonClick 콜백 함수 호출하여 업데이트된 데이터 전달
          onSaveButtonClick(updatedData);

          // 수정하기 버튼 비활성화
          setIsEditing(false);

          // BottomSheet를 닫음
          onClose();
        } else {
          console.error('서버에서 오류 응답을 받았습니다.');
        }
      } catch (error) {
        console.error('요청을 보내는 중 오류가 발생했습니다.', error);
      }
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 입력값 변경 시 실행되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70%',
          margin: 'auto',
          zIndex: '500',
          borderRadius: '28px 28px 0 0',
        },
      }}
    >
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {isEditing ? (
          <TextField
            fullWidth
            variant='outlined'
            value={inputValue}
            onChange={handleChange}
          />
        ) : (
          <Box>{item ? user.userData[item] : ''}</Box>
        )}

        {isEditing ? (
          <Button fullWidth variant='contained' onClick={handleSaveClick}>
            저장하기
          </Button>
        ) : (
          <Button fullWidth variant='contained' onClick={handleEditClick}>
            수정하기
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default BottomSheet;
