'use client';

import { BuddyError, ErrorCode } from '@/utils/error';
import { removeAccessToken } from '@/utils/server';
import { Stack } from '@mui/material';
import LoadingPage from './loading';

const ErrorPage = ({
  error,
  reset,
}: {
  error: BuddyError & { digest?: string };
  reset: () => void;
}) => {
  const errorPage = (() => {
    switch (error.code) {
      case ErrorCode.UNAUTHORIZED_ERROR: {
        removeAccessToken();
        window.location.href = '/login';
        return <LoadingPage />;
      }
      case ErrorCode.GENERAL_LOGIC_ERROR:
      default:
        return <UnknownErrorPage />;
    }
  })();

  return errorPage;
};

export default ErrorPage;

const UnknownErrorPage = () => {
  return (
    <Stack direction='column' padding='2rem 1rem' height='100vh' pb='10vh'>
      <h1>알 수 없는 에러 발생</h1>
    </Stack>
  );
};
