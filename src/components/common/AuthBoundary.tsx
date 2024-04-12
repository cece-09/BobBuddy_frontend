'use client';

import { userState } from '@/providers/userAtom';
import { requestValidateToken } from '@/server/auth';
import { requestProfile } from '@/server/user';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const PUBLIC_PATHS = ['/login', '/create-account', '/forgot-password'];
const isRoot = (path: string) => path === '/';
const isPublic = (path: string) => PUBLIC_PATHS.includes(path);

export const AuthBoundary = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [user, setUser] = useRecoilState(userState);
  const pathname = usePathname();

  const initUserProfile = (isValidToken: boolean | undefined) => {
    if (!isValidToken) return;
    requestProfile().then(profile => {
      console.info(`User profile fetched`);
    });
  };

  useEffect(() => {
    requestValidateToken().then(isValidToken => {
      initUserProfile(isValidToken);
      setAuth(isValidToken);
    });
  }, []);

  if (auth === false && !isPublic(pathname)) {
    window.location.href = '/login';
    return null;
  }

  if (auth === true && (isRoot(pathname) || isPublic(pathname))) {
    window.location.href = '/home';
    return null;
  }

  return <>{auth !== undefined && children}</>;
};
