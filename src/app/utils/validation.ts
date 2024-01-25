// 이메일 형식 검증
export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email); // boolean 값으로 반환
};
// 정규표현식
// ^:문자열의 시작
// [A-Z0-9._%+-]+: 대문자 A-Z, 숫자 0-9, 점(.), 밑줄(_), 퍼센트(%), 더하기(+), 빼기(-) 중 하나 이상을 포함해야 함
// @: @ 기호가 반드시 있어야 함
// [A-Z0-9.-]+: 대문자 A-Z, 숫자 0-9, 점(.) 또는 하이픈(-) 중 하나 이상을 포함해야 함
// \\.[A-Z]{2,}: 점(.) 뒤에 대문자 A-Z가 최소 2개 이상 있어야 함
// $: 문자열의 끝
// i: 대소문자 구분 없이 검사

// 휴대폰 번호 형식 검증
export const isValidPhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^[0-9]{11}$/;
  return phoneNumberRegex.test(phoneNumber); // boolean 값으로 반환
};
// ^: 문자열의 시작
// [0-9]{11}: 숫자 0-9가 정확히 11개 있어야 함
// $: 문자열의 끝