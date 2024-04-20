'use client';

import { ToastState, ToastType } from '@/types/common';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

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

  return (
    <ModalContext.Provider
      value={{
        toast: toast,
        setToast: setToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
