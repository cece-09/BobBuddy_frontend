'use client';

import LoadingPage from '@/app/loading';
import { requestValidateToken } from '@/server/auth';
import { isPublicPath, isRootPath } from '@/utils/common';
import { usePathname } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

export interface User {
  userId: number;
  userImg: string;
  username: string;
  email: string;
  birth: string;
  gender: string;
  mbti: string;
  favoriteFood: string;
  dislikedFood: string;
}

export interface Auth {
  isLoggedIn: boolean;
  password: string;
  repassword: string;
}

interface UserContextType {
  user: {
    userData: User;
    auth: Auth;
  };
  setUserData: Dispatch<SetStateAction<User | undefined>>;
}

export const DUMMY_USER_PROFILE: User = {
  userId: 0,
  userImg: '',
  username: '김초원',
  email: 'kimfield98@gmail.com',
  birth: '미입력',
  gender: '미입력',
  mbti: '미입력',
  favoriteFood: '미입력',
  dislikedFood: '미입력',
};

export const UserContext = createContext<UserContextType>({
  user: {
    userData: DUMMY_USER_PROFILE,
    auth: {
      isLoggedIn: false,
      password: '',
      repassword: '',
    },
  },
  setUserData: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const isValidToken = await requestValidateToken();
      if (isValidToken) {
        // FIXME:
        // const profile = await requestProfile();
        setUserData(DUMMY_USER_PROFILE);
      } else {
        setUserData(undefined);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (isPublicPath(pathname)) {
    return <>{children}</>;
  }

  if (isRootPath(pathname)) {
    window.location.href = '/home';
    return null;
  }

  if (userData === undefined) {
    window.location.href = '/login';
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        user: {
          userData,
          auth: {
            isLoggedIn: true,
            password: '',
            repassword: '',
          },
        },
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
