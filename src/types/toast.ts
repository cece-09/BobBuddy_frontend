import { ErrorCode } from '@/utils/error';
import { MS } from './common';

export enum ToastType {
  ERROR = 'ERROR',
}

export interface ToastTypeState {
  [ToastType.ERROR]: ErrorCode;
}

export type ToastState<T extends ToastType> = {
  toastType: T;
  payload: ToastTypeState[T];
};

export type ToastProps = {
  closeMS?: MS;
};
