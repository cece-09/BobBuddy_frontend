import { theme } from '@/styles/theme';
import { PageType } from '@/types/common';
import { Box, Stack, styled } from '@mui/material';
import React, { ReactNode } from 'react';
import Appbar, { AppbarProps } from './Appbar';
import BottomNavbar from './BottomNavbar';

interface PageProps {
  type: PageType;
  children: ReactNode;
  showAppbar?: boolean;
  showNavbar?: boolean;
  appbarProps?: AppbarProps;
  scrollable?: boolean;
}

const Page = React.forwardRef(
  (props: PageProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { type, children, appbarProps, showAppbar, showNavbar, scrollable } =
      props;

    switch (type) {
      case PageType.PLAIN:
        return (
          <PageWrapper>
            {showAppbar && <Appbar {...appbarProps} />}
            <Paper ref={ref} scrollable={scrollable}>
              {children}
            </Paper>
            {showNavbar && <BottomNavbar />}
          </PageWrapper>
        );

      case PageType.MULTI_STEP:
        const pages = React.Children.toArray(children);
        return (
          <PageWrapper>
            {showAppbar && <Appbar {...appbarProps} />}
            <Stack direction='row' ref={ref}>
              {pages.map((page, index) => (
                <Paper key={index} scrollable={scrollable}>
                  {page}
                </Paper>
              ))}
            </Stack>
            {showNavbar && <BottomNavbar />}
          </PageWrapper>
        );
    }
  },
);

Page.displayName = 'Page';

export default Page;

interface PaperProps {
  scrollable?: boolean;
  children: ReactNode;
}

const Paper = React.forwardRef(
  (props: PaperProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { scrollable, children } = props;
    return (
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1rem',
          overflowX: 'hidden',
          overflowY: scrollable ? 'auto' : 'hidden',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    );
  },
);

const PageWrapper = styled(Stack)({
  flexDirection: 'column',
  height: '100vh',
  overflowX: 'hidden',
  flexShrink: 0,
  backgroundColor: theme.palette.background.default,
});

Paper.displayName = 'Paper';
