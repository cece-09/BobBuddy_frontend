import { atom } from 'recoil';

interface User {
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
      username: '',
      email: '',
      birth: '',
      gender: '',
      mbti: '',
      favoriteFood: '',
      dislikedFood: '',
    },
    auth: {
      isLoggedIn: false,
      password: '',
      repassword: ''
    }
  },
});
