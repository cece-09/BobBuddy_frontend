import {
  AnimationDirection,
  useAnimatedRender,
} from '@/hooks/useAnimatedRender';
import { ToastType } from '@/types/modal';
import { Icon, IconButton, Stack } from '@mui/material';
import React, { useContext } from 'react';

import { ModalContext } from '@/providers/ModalProvider';
import { ErrorCode, getErrorCodeMsg } from '@/utils/error';

const ToastResolver = () => {
  const { toast, setToast } = useContext(ModalContext);
  const close = () => setToast(undefined);

  switch (toast?.toastType) {
    case ToastType.ERROR:
      const message = getErrorCodeMsg(toast.payload as ErrorCode);
      return (
        <Toast
          message={message}
          isOpen={true}
          closeToast={close}
          animationDirection={AnimationDirection.TOP_TO_BOTTOM}
        />
      );
    default:
      return null;
  }
};
export default ToastResolver;

interface ToastProps {
  isOpen: boolean;
  message: string;
  closeToast: () => void;
  animationDirection: AnimationDirection;
}

const TOAST_ANIMATION_DURATION = 500;

const Toast = ({
  message,
  isOpen,
  closeToast,
  animationDirection,
}: ToastProps) => {
  const toastRef = React.createRef<HTMLDivElement>();

  const onCloseClick = () => {
    unmount();
    setTimeout(() => {
      closeToast();
    }, TOAST_ANIMATION_DURATION);
  };

  const { unmount } = useAnimatedRender({
    targetRef: toastRef,
    direction: animationDirection,
    transitionMs: TOAST_ANIMATION_DURATION,
  });

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
