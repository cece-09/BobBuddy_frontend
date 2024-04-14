'use client';

import { ReactNode } from 'react';
import { MatchProvider } from './components/MatchProvider';

type HomePageLayoutProps = {
  children: ReactNode;
};

const HomePageLayout: React.FC<HomePageLayoutProps> = ({ children }) => {
  return <MatchProvider>{children}</MatchProvider>;
};

export default HomePageLayout;
