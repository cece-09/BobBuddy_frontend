'use client';

import { Stack, Typography, styled } from '@mui/material';
import { ReactNode } from 'react';

export interface ModalBackdropOptions {
  message?: ReactNode;
  backgroundColor?: string;
}

interface ModalBackdropProps extends ModalBackdropOptions {
  children: ReactNode;
  onClick?: () => void;
}

export const ModalBackdrop = ({
  children,
  onClick,
  message,
  backgroundColor = '#00000070',
}: ModalBackdropProps) => {
  return (
    <Stack
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundColor: backgroundColor,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
      }}
      onClick={e => {
        onClick?.();
        e.stopPropagation();
      }}
    >
      {children}
      <BackdropMessage>{message}</BackdropMessage>
    </Stack>
  );
};

const BackdropMessage = styled(Typography)(({ theme }) => ({
  color: 'white',
  position: 'absolute',
  margin: 'auto',
}));
