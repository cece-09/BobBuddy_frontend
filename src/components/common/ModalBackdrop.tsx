'use client';

import { Stack } from '@mui/material';
import { ReactNode } from 'react';

export const ModalBackdrop = ({
  children,
  onClick,
  message,
}: {
  children: ReactNode;
  onClick: () => void;
  message?: ReactNode;
}) => {
  return (
    <Stack
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundColor: '#00000070',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
      }}
      onClick={e => {
        onClick();
        e.stopPropagation();
      }}
    >
      {children}
      {message}
    </Stack>
  );
};
