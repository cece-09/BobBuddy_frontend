import { ModalContext } from '@/providers/ModalProvider';
import { ToastProps, ToastType } from '@/types/toast';
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

  return { showErrorToast };
};

export default useToast;
