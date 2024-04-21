'use client';

import { Toast } from '@/components/common/Toast';
import { AnimationDirection } from '@/hooks/useAnimatedRender';
import { ToastState, ToastType } from '@/types/common';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  toast: ToastState<ToastType> | undefined;
  setToast: Dispatch<SetStateAction<ToastState<ToastType> | undefined>>;
}

export const ModalContext = createContext<ModalContextType>({
  toast: undefined,
  setToast: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState<ToastType> | undefined>();

  const BUDDY_MAIN_ID = 'buddy-main';
  const main = document.getElementById(BUDDY_MAIN_ID);

  return (
    <ModalContext.Provider
      value={{
        toast: toast,
        setToast: setToast,
      }}
    >
      {children}
      {toast &&
        main &&
        createPortal(
          <Toast
            message={toast.payload}
            closeToast={() => setToast(undefined)}
            animationDirection={AnimationDirection.TOP_TO_BOTTOM}
          />,
          main,
        )}
    </ModalContext.Provider>
  );
};
