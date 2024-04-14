import { ModalContext } from '@/providers/ModalProvider';
import { ToastProps, ToastType } from '@/types/modal';
import { ErrorCode } from '@/utils/error';
import { useContext } from 'react';

const useToast = () => {
  const { setToast } = useContext(ModalContext);

  const showErrorToast = (code: ErrorCode, props?: ToastProps) => {
    setToast({
      toastType: ToastType.ERROR,
      payload: code,
    });

    if (props?.closeMS) {
      setTimeout(() => {
        setToast(undefined);
      }, props.closeMS);
    }
  };

  const showToast = (message: string, props?: ToastProps) => {
    setToast({
      toastType: ToastType.INFO,
      payload: message,
    });

    if (props?.closeMS) {
      setTimeout(() => {
        setToast(undefined);
      }, props.closeMS);
    }
  };

  return { showErrorToast, showToast };
};

export default useToast;
