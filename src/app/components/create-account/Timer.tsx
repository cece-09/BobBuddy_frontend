import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  onTimeExpired?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeExpired }) => {
  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          clearInterval(interval);
          if (onTimeExpired) {
            onTimeExpired(); // 시간 만료 콜백
          }
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime, onTimeExpired]);

  const displayTime = (): string => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div>시간:{displayTime()}</div>;
};

export default Timer;
