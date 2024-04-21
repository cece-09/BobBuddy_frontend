import { ModalContext } from '@/providers/ModalProvider';
import { Button, Stack, styled } from '@mui/material';
import { useContext } from 'react';
import { TextType } from '@/types/common';
import Text from '../common/Text';
import { ModalBackdrop } from '../common/ModalBackdrop';
import { theme } from '@/styles/theme';

const MatchPendingModal = () => {
  const { closeModal } = useContext(ModalContext);

  return (
    <ModalBackdrop backgroundColor={theme.palette.background.default}>
      <Wrapper>
        <Text type={TextType.HEADER}>런치메이트를 찾고 있어요</Text>
        <Text>매칭이 완료된 경우 push 알림을 보내드려요!</Text>
        <CancelButton onClick={closeModal}>닫기</CancelButton>
      </Wrapper>
    </ModalBackdrop>
  );
};

export default MatchPendingModal;

export const Wrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  gap: '1rem',
  width: '100%',
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '3rem',
  borderRadius: 10,
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
}));
