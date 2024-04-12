'use client';
import { toastState } from '@/providers/toastAtom';
import React from 'react';
import { useRecoilState } from 'recoil';
import BottomNavbar from './BottomNavbar';
import Toast from './Toast';
import { ToastType } from '@/types/toast';
import { AnimationDirection } from '@/hooks/useAnimatedRender';
import { getErrorCodeMsg } from '@/utils/error';

interface PageProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageProps) => {
  return (
    <React.Fragment>
      {children}
      <BottomNavbar />
      <ToastResolver />
    </React.Fragment>
  );
};

export default PageLayout;

const ToastResolver = () => {
  const [toast, setToast] = useRecoilState(toastState);
  const close = () => setToast(undefined);

  switch (toast?.toastType) {
    case ToastType.ERROR:
      const message = getErrorCodeMsg(toast.payload);
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
