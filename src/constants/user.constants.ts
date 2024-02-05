export const MIN_PASSWORD_LENGTH = 9

// sign-in
export const SIGNIN_API = "http://yousayrun.store:8080/auth/sign-in"
export const SIGNIN_KAKAO_API = "http://yousayrun.store:8080/auth/sign-in/kakao"
export const SIGNIN_NAVER_API = "http://yousayrun.store:8080/auth/sign-in/naver"

// sign-up
export const SIGNUP_API = "http://yousayrun.store:8080/user/signup"
export const SIGNUP_SEND_API = "http://yousayrun.store:8080/user/signup/send"
export const SIGNUP_VERIFY_API = "http://yousayrun.store:8080/user/signup/verify"

// forgot-password (로그인 페이지)
export const FORGOT_PASSWORD_API = "http://localhost:3000/mypassword"

// change-password (프로필 페이지)
export const PASSWORD_VALIDATE_API = 'http://yousayrun.store:8080/user/validate/password'
export const PASSWORD_UPDATE_API = 'http://yousayrun.store:8080/user/update/password'