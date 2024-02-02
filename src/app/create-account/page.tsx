"use client"
import { useEffect, useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { isValidEmail } from '../utils/validation';
import Timer from '../components/create-account/Timer';

const MIN_PASSWORD_LENGTH = 9;
const SIGNUP_API = 'http://yousayrun.store:8080/user/signup';

export default function SignupPage() {
  // 상태 변수 선언
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isVerificationSent, setIsVerificationSent] = useState<boolean>(false);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState<boolean>(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(true);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    verify: '',
    password: '',
    repassword: '',
  });
  // 전체 폼 유효성 검사 상태
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const { name, email, verify, password, repassword } = formData;

  // 이메일, 비밀번호 유효성 검증
  useEffect(() => {
    setIsFormValid(
      isValidEmail(email) && 
      password.length >= MIN_PASSWORD_LENGTH &&
      isPasswordsMatch && // 비밀번호 일치 검증
      isVerificationCodeValid && // 이메일 인증 검증
      name.trim() !== '' // 이름 필드가 비어있지 않은지 검증
    );
  }, [email, password, repassword, isPasswordsMatch, isVerificationCodeValid, name]);

  // 입력 필드 변경 시 폼 데이터 상태 업데이트
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));

    // 새로운 입력 값을 사용하여 비밀번호 일치 여부 검사
    if (name === 'password' || name === 'repassword') {
    const newPassword = name === 'password' ? value : formData.password;
    const newRepassword = name === 'repassword' ? value : formData.repassword;

    // 비밀번호 확인 필드에 입력이 있는 경우에만 일치 여부 검사
    if (newRepassword.length > 0) {
      setIsPasswordsMatch(newPassword === newRepassword);
    }
  }
  };

  // 이메일 유효성 검증
  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
  }, [email]);

  // 인증번호 유효성 검증
  useEffect(() => {
    setIsVerificationCodeValid(verify.length === 6);
  }, [verify]);

  // 인증 버튼 클릭 시
  const handleVerifyClick = async () => {
    try {
      const response = await fetch('http://yousayrun.store:8080/user/signup/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail:email }),
      });

      setTimerActive(true); // 타이머 활성화
      console.log("타이머 활성화됨");
  
      if (response.ok) {
        setIsVerificationSent(true); 
        alert('인증번호를 입력하세요')
      } else {
        alert('이메일 인증 요청에 실패했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  const handleTimeExpired = () => {
    console.log("인증 시간이 만료되었습니다. 다시 진행하세요");
    setTimerActive(false);
  };

  // 재전송 버튼 클릭 시
  const handleResendClick = () => {
    setIsVerificationSent(false);
    setIsEmailValid(false);
    setFormData({ ...formData, email: '', verify: '' });
  };

  // 확인 버튼 클릭 시
  const handleConfirmClick = async () => {
    try {
      const response = await fetch('http://yousayrun.store:8080/user/signup/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, authNumber: verify }),
      });
  
      if (response.ok) {
        setTimerActive(false);
        alert('이메일 인증이 성공했습니다');
      } else {
        alert('인증 요청에 실패했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  // 회원가입 버튼 클릭 시
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(SIGNUP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: email,
        userName: name,
        pwd: password,
      }),
    });

    if (res.ok) {
      alert('회원가입 성공!')
      window.location.href = '/login'
    } else {
      alert('올바른 회원가입 정보를 입력하세요')
    }
    } catch (error) {
      alert('로그인 요청 중 오류가 발생했습니다. 다시 시도하세요')
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          밥버디 회원가입
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleInputChange}
            error={!isValidEmail(email) && email.length > 0}
            helperText={!isValidEmail(email) && email.length > 0 ? '올바른 이메일 형식을 입력하세요.' : ''}
          />
          <Box sx={{ display: 'flex', alignItems:'center', gap: '10px', my: '10px' }}>
            <Button
              fullWidth
              type="button"
              variant="contained"
              disabled={!isEmailValid} // 이메일 유효성에 따른 활성화
              onClick={handleVerifyClick}
            >
              인증
            </Button>
            <Button
              fullWidth
              type="button"
              variant="contained"
              disabled={!isVerificationSent} // 인증 버튼 클릭 여부에 따른 활성화
              onClick={handleResendClick}
            >
              재전송
            </Button>
          </Box>
          {isVerificationSent && timerActive && (
            <Timer initialTime={179} onTimeExpired={handleTimeExpired} />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="verify"
            label="인증번호"
            placeholder='인증번호 6자리를 입력하세요'
            name="verify"
            autoComplete="verify"
            autoFocus
            value={verify}
            onChange={handleInputChange}
            disabled={!isVerificationSent} // 인증 버튼 클릭 여부에 따른 활성화
          />
          <Button
            fullWidth
            type="button"
            variant="contained"
            sx={{ my: '10px' }}
            disabled={!isVerificationCodeValid} // 인증번호 유효성에 따른 활성화
            onClick={handleConfirmClick}
          >
            확인
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
            error={password.length > 0 && password.length < MIN_PASSWORD_LENGTH}
            helperText={password.length > 0 && password.length < MIN_PASSWORD_LENGTH ? '비밀번호는 9자 이상이어야 합니다.' : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repassword"
            label="비밀번호 확인"
            type="password"
            id="repassword"
            autoComplete="current-repassword"
            value={repassword}
            onChange={handleInputChange}
            error={!isPasswordsMatch}
            helperText={!isPasswordsMatch ? '비밀번호가 일치하지 않습니다.' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!isFormValid}
          >
            회원가입
          </Button>
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3
            }}
          >
            <Link href="/login" variant="body2">
              이미 계정이 있으신가요? {"로그인"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
