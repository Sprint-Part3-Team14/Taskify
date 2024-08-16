import { useState } from 'react';

type I_ToastType = 'error' | 'complete' | 'warning';

export const useHandleToast = () => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [type, setType] = useState<I_ToastType>('complete');
  const [message, setMessage] = useState('');

  const handleToggleToast = () => {
    isShowToast ? setIsShowToast(false) : setIsShowToast(true);
  };

  const handleToastType = (type: I_ToastType) => {
    setType(type);
  };

  const handleToastMessage = message => {
    setMessage(message);
  };

  return { isShowToast, handleToggleToast, setIsShowToast, handleToastType, type, handleToastMessage, message };
};
