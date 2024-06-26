import {
  AnimationDirection,
  useAnimatedRender,
} from '@/hooks/useAnimatedRender';
import { Icon, IconButton, Stack } from '@mui/material';
import React from 'react';

interface ToastProps {
  message: string;
  closeToast: () => void;
  animationDirection: AnimationDirection;
}

const TOAST_ANIMATION_DURATION = 500;

export const Toast = ({
  message,
  closeToast,
  animationDirection,
}: ToastProps) => {
  const toastRef = React.createRef<HTMLDivElement>();

  const { unmount } = useAnimatedRender({
    targetRef: toastRef,
    direction: animationDirection,
    transitionMs: TOAST_ANIMATION_DURATION,
  });

  const onCloseClick = () => {
    unmount();
    setTimeout(() => {
      closeToast();
    }, TOAST_ANIMATION_DURATION);
  };

  return (
    <Stack
      ref={toastRef}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        padding: '0px 10px',
        borderRadius: 3,
        marginLeft: '2.5%',
        width: '95%',
        height: 50,
        boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)',
        backgroundColor: 'white',
      }}
    >
      {message}
      <IconButton onClick={onCloseClick}>
        <Icon>close</Icon>
      </IconButton>
    </Stack>
  );
};
