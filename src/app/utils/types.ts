// type은 유니온, 인터섹션, 튜플 등 복잡한 타입을 정의할 때 유용
// interface는 객체의 형태를 정의하고 확장할 때 유용

export type UserData = {
  name: string;
  gender: string;
  email: string;
  phonenumber: string;
  password: string;
  repassword: string;
  mbti: string;
  likefood: string;
  hatefood: string;
};

export type AuthenticationProps = {
  onNext: () => void;
  onAuthenticate: (authenticated: boolean) => void;
};

export interface BasicInfoProps {
  userData: UserData;
  onUserDataChange: (newData: Partial<UserData>) => void;
  onBasicInfoFilled: (isFilled: boolean) => void;
}

export type MBTIType = 'ISFJ' | 'ISTJ' | 'INFJ' | 'INTJ' | 'ISFP' | 'ISTP' | 'INFP' | 'INTP' | 'ESFP' | 'ESTP' | 'ENFP' | 'ENTP' | 'ESFJ' | 'ESTJ' | 'ENFJ' | 'ENTJ';

export interface MBTIInfoProps {
  userData: UserData;
  onUserDataChange: (newData: Partial<UserData>) => void;
}

export type FoodPreference = '족발,보쌈' | '돈까스' | '회,초밥' | '고기,구이' | '피자' | '치킨' | '버거' | '샌드위치, 샐러드' | '찜,탕,찌개' | '짜장면, 짬뽕' | '마라탕' | '쌀국수' | '백반,죽' | '국수' | '분식' | '카페,디저트';

export interface FoodPreferenceInfoProps {
  userData: {
    likefood: string;
    hatefood: string;
  };
  onUserDataChange: (newData: Partial<FoodPreferenceInfoProps['userData']>) => void;
}