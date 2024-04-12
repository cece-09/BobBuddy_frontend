import { atom } from 'recoil';

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

interface Auth {
  isLoggedIn: boolean;
  password: string;
  repassword: string;
}

export const userState = atom<{
  userData: User;
  auth: Auth;
}>({
  key: 'userState',
  default: {
    userData: {
      userId: 0,
      userImg: '',
      username: '김초원',
      email: 'kimfield98@gmail.com',
      birth: '미입력',
      gender: '미입력',
      mbti: '미입력',
      favoriteFood: '미입력',
      dislikedFood: '미입력',
    },
    auth: {
      isLoggedIn: false,
      password: '',
      repassword: '',
    },
  },
});
