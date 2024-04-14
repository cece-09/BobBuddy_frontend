'use client';

import { ModalState, ModalType, ToastState, ToastType } from '@/types/modal';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface ModalContextType {
  toast: ToastState<ToastType> | undefined;
  modal: ModalState<ModalType> | undefined;
  setToast: Dispatch<SetStateAction<ToastState<ToastType> | undefined>>;
  setModal: Dispatch<SetStateAction<ModalState<ModalType> | undefined>>;
}

export const ModalContext = createContext<ModalContextType>({
  toast: undefined,
  modal: undefined,
  setToast: () => {},
  setModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState<ToastType> | undefined>();
  const [modal, setModal] = useState<ModalState<ModalType> | undefined>();

  return (
    <ModalContext.Provider
      value={{
        toast: toast,
        modal: modal,
        setToast: setToast,
        setModal: setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
