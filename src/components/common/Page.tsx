import { theme } from '@/styles/theme';
import { PageType } from '@/types/common';
import { Box, Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import Appbar, { AppbarProps } from './Appbar';

interface PageProps {
  type: PageType;
  children: ReactNode;
  showAppbar?: boolean;
  appbarProps?: AppbarProps;
  scrollable?: boolean;
}

const Page = React.forwardRef(
  (props: PageProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { type, children, appbarProps, showAppbar, scrollable } = props;

    switch (type) {
      case PageType.PLAIN:
        return (
          <React.Fragment>
            {showAppbar && <Appbar {...appbarProps} />}
            <Paper ref={ref} scrollable={scrollable}>
              {children}
            </Paper>
          </React.Fragment>
        );

      case PageType.MULTI_STEP:
        const pages = React.Children.toArray(children);
        return (
          <React.Fragment>
            {showAppbar && <Appbar {...appbarProps} />}
            <Stack direction='row' ref={ref}>
              {pages.map((page, index) => (
                <Paper key={index} scrollable={scrollable}>
                  {page}
                </Paper>
              ))}
            </Stack>
          </React.Fragment>
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

Paper.displayName = 'Paper';
