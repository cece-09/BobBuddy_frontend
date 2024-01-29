import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    userData: {
      userId: '',
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
