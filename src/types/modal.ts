/* eslint-disable no-unused-vars */
import { ErrorCode } from '@/utils/error';
import { MS } from './common';

export enum ToastType {
  ERROR = 'ERROR',
  INFO = 'INFO',
}

export interface ToastTypeState {
  [ToastType.ERROR]: ErrorCode;
  [ToastType.INFO]: string;
}

export type ToastState<T extends ToastType> = {
  toastType: T;
  payload: ToastTypeState[T];
};

export type ToastProps = {
  closeMS?: MS;
};

export enum ModalType {
  SEARCH = 'SEARCH',
}

export interface ModalProps {
  [ModalType.SEARCH]: {
    defaultKeyword?: string;
    placeholder: string;
    suggestions: { name: string; description: string }[];
    debounceMs?: number;
    closeModal: () => void;
    onKeywordChange: (keyword: string | undefined) => void;
    onSelectSuggestion: (index: number) => void;
  };
}

export interface ModalState<T extends ModalType> {
  modalType: T;
  payload: ModalProps[T];
}
