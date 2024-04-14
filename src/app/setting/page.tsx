'use client';

import Page from '@/components/common/Page';
import Text from '@/components/common/Text';
import { requestSignOut } from '@/server/auth';
import { PageType, TextType } from '@/types/common';
import { getAccessToken, removeAccessToken } from '@/utils/server';
import { Button } from '@mui/material';

export default function SettingPage() {
  const handleLogout = () => signout();

  return (
    <Page type={PageType.PLAIN} scrollable>
      <Text type={TextType.HEADER}>설정</Text>
      <Button onClick={handleLogout}>로그아웃</Button>
    </Page>
  );
}

const signout = async () => {
  if (!getAccessToken()) {
    return;
  }

  await requestSignOut().then(() => {
    removeAccessToken();
    window.location.href = '/';
  });
};
