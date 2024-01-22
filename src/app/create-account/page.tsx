"use client"
import React, { useState } from 'react';
import Authentication from '../components/create-account/AuthenticationStep';
import BasicInfo from '../components/create-account/BasicInfoStep';
import MBTIInfo from '../components/create-account/MBTIInfoStep';
import LocationInfo from '../components/create-account/LocationInfoStep';
import FoodPreferenceInfo from '../components/create-account/FoodPreferenceInfoStep';
import UserInfo from '../components/create-account/UserInfoStep';
import { Box, Button } from '@mui/material';

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(1);
  
  // 다음 단계로 진행하는 함수
  const handleNextStep = () => {
    if (activeStep < 6) {
      setActiveStep(activeStep + 1);
    }
  };

  // 이전 단계로 돌아가는 함수
  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // 조건을 확인하여 다음으로 넘어갈 수 있는지 여부를 반환
  const canProceedToNextStep = () => {
    switch (activeStep) {
      case 1:
        // 필요한 조건
        return true; // 현재는 무조건 다음으로 진행 가능
      case 2:
        // 필요한 조건
        return true;
      case 3:
        // 필요한 조건
        return true;
      case 4:
        // 필요한 조건
        return true;
      case 5:
        // 필요한 조건
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        {activeStep === 1 && <Authentication onNext={handleNextStep} />}
        {activeStep === 2 && <BasicInfo />}
        {activeStep === 3 && <MBTIInfo />}
        {activeStep === 4 && <LocationInfo />}
        {activeStep === 5 && <FoodPreferenceInfo />}
        {activeStep === 6 && <UserInfo />}
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
          }}
        >
        {activeStep > 1 && (
          <Button onClick={handlePreviousStep}>이전</Button>
          
        )}
        {activeStep < 6 && (
          <Button onClick={handleNextStep} disabled={!canProceedToNextStep()}>다음</Button>
        )}
        </Box>
      </Box>
    </>
  );
}
