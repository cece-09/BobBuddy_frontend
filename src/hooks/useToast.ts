import { toastState } from '@/providers/toastAtom';
import { ToastProps, ToastType } from '@/types/toast';
import { ErrorCode } from '@/utils/error';
import { useRecoilState } from 'recoil';

const useToast = () => {
  const [_, setToast] = useRecoilState(toastState);

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
