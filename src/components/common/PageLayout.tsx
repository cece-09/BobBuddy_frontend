'use client';
import React from 'react';

import { Stack, styled } from '@mui/material';
import { ReactNode } from 'react';
import BottomNavbar from './BottomNavbar';
import ToastResolver from './Toast';

interface PageProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageProps) => {
  return (
    <PageLayoutStyle>
      {children}
      <BottomNavbar />
      <ToastResolver />
    </PageLayoutStyle>
  );
};

export default PageLayout;

const PageLayoutStyle: React.FC<{ children: ReactNode }> = styled(Stack)(
  ({ theme }) => ({
    flexDirection: 'column',
    height: '100vh',
    overflowX: 'hidden',
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  }),
);
