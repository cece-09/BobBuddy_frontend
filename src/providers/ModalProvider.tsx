'use client';

import { Toast } from '@/components/common/Toast';
import MatchPendingModal from '@/components/modal/MatchPending';
import MatchSuccessModal from '@/components/modal/MatchSuccess';
import { AnimationDirection } from '@/hooks/useAnimatedRender';
import { ModalType, ToastState, ToastType } from '@/types/common';
import { Match } from '@/types/match';
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
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  toast: undefined,
  setToast: () => {},
  openModal: (modalType: ModalType) => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState<ToastType> | undefined>();
  const [modal, setModal] = useState<ModalType | undefined>();

  const BUDDY_MAIN_ID = 'buddy-main';
  const main = document.getElementById(BUDDY_MAIN_ID);

  const openModal = (modalType: ModalType) => {
    setModal(modalType);
  };

  const closeModal = () => {
    setModal(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        toast,
        setToast,
        openModal,
        closeModal,
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
      {modal && main && createPortal(rendderModal(modal), main)}
    </ModalContext.Provider>
  );
};

const rendderModal = (key: ModalType) => {
  switch (key) {
    case ModalType.MATCH_SUCCESS:
      const dummyMatch: Match = {
        id: '1',
        title: 'dummy',
        time: 'dummy',
        userprofiles: ['uuid1', 'uuid2', 'uuid3'],
        recentChatMsg: '',
      };
      return <MatchSuccessModal match={dummyMatch} />;
    case ModalType.MATCH_PENDING:
      return <MatchPendingModal />;
    default:
      return null;
  }
};
