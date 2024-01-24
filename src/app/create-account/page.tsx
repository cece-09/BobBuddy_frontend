"use client"
import { useState } from 'react';
import Authentication from '../components/create-account/AuthenticationStep';
import BasicInfo from '../components/create-account/BasicInfoStep';
import MBTIInfo from '../components/create-account/MBTIInfoStep';
import FoodPreferenceInfo from '../components/create-account/FoodPreferenceInfoStep';
import UserInfo from '../components/create-account/UserInfoStep';
import { Box, Button } from '@mui/material';
import { UserData } from '../utils/types';

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [basicCompleted, setBasicCompleted] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    email: '',
    phonenumber: '',
    password: '',
    repassword: '',
    mbti: '',
    likefood: '',
    hatefood: '',
  });

  const handleUserDataChange = (newData: UserData) => {
    setUserData(prevData => ({ ...prevData, ...newData }));
  };

  // 이전 혹은 다음 버튼 작동
  const handleStepChange = (increment: number) => {
    setActiveStep(prevStep => prevStep + increment);
  };

  // 조건을 확인하여 다음으로 넘어갈 수 있는지 여부를 반환
  const canProceedToNextStep = () => {
    // if (activeStep === 1) return isAuthenticated;
    if (activeStep === 2) return basicCompleted;
    return true;
  };

  const commonBoxStyle = {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <>
      <Box sx={commonBoxStyle}>
        {activeStep === 1 &&
          <Authentication
            onNext={() => handleStepChange(1)}
            onAuthenticate={setIsAuthenticated}
          />
        }
        {activeStep === 2 &&
          <BasicInfo
            userData={userData}
            onUserDataChange={(newData) => handleUserDataChange(newData as UserData)}
            onBasicInfoFilled={setBasicCompleted}
          />
        }
        {activeStep === 3 &&
          <MBTIInfo
            userData={userData}
            onUserDataChange={(newData) => handleUserDataChange(newData as UserData)}
          />
        }
        {activeStep === 4 &&
          <FoodPreferenceInfo
            userData={userData}
            onUserDataChange={(newData) => handleUserDataChange(newData as UserData)}
          />
        }
        {activeStep === 5 && <UserInfo userData={userData} />}
        <Box sx={{ mt: 3 }}>
          {activeStep > 1 && <Button variant='contained' sx={{ mx:1 }} onClick={() => handleStepChange(-1)}>이전</Button>}
          {activeStep < 5 && <Button variant='contained' sx={{ mx:1 }} onClick={() => handleStepChange(1)} disabled={!canProceedToNextStep()}>다음</Button>}
        </Box>
      </Box>
    </>
  );
}
