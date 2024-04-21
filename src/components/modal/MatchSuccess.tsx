import { ModalContext } from '@/providers/ModalProvider';
import { Match } from '@/types/match';
import { Avatar, AvatarGroup, Button, Stack, styled } from '@mui/material';
import { useContext } from 'react';
import { TextType } from '@/types/common';
import Text from '../common/Text';
import { ModalBackdrop } from '../common/ModalBackdrop';
import { theme } from '@/styles/theme';

interface MatchSuccessProps {
  match: Match;
}

const MatchSuccessModal = ({ match }: MatchSuccessProps) => {
  const { closeModal } = useContext(ModalContext);

  const onClickConfirm = () => {
    window.location.href = `/chat/${match.id}`;
  };

  return (
    <ModalBackdrop backgroundColor={theme.palette.background.default}>
      <Wrapper>
        <Text type={TextType.HEADER}>매칭이 성공했어요!</Text>
        <AvatarGroup max={3} total={match.userprofiles.length}>
          {match.userprofiles.map((profile, idx) => (
            <Avatar key={idx} src={profile} variant='square' />
          ))}
        </AvatarGroup>
        <ConfirmButton onClick={onClickConfirm}>채팅방 이동</ConfirmButton>
        <CancelButton onClick={closeModal}>닫기</CancelButton>
      </Wrapper>
    </ModalBackdrop>
  );
};

export default MatchSuccessModal;

export const Wrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  gap: '1rem',
  width: '100%',
}));

export const ConfirmButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '3rem',
  borderRadius: 10,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const CancelButton = styled(ConfirmButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  },
}));
