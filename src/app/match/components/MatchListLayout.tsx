'use client';

import Page from '@/components/common/Page';
import Text from '@/components/common/Text';
import { Spacing } from '@/components/common/utils';
import { PageType, TextType } from '@/types/common';
import { ReactNode } from 'react';

interface MatchListWrapperProps {
  today: ReactNode;
  history: ReactNode;
}

const MatchListLayout = ({ today, history }: MatchListWrapperProps) => {
  return (
    <Page type={PageType.PLAIN} showAppbar showNavbar scrollable>
      <Text type={TextType.SUB_HEADER}>참여중인 매칭방</Text>
      <Spacing direction='column' size={1} />
      {today}
      <Spacing direction='column' size={3} />
      <Text type={TextType.SUB_HEADER}>매칭 히스토리</Text>
      <Spacing direction='column' size={1} />
      {history}
    </Page>
  );
};

export default MatchListLayout;
