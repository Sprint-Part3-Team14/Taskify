'use client';

import Toast from '@/components/common/Toast/Toast';
import { useHandleToast } from '@/hooks/usehandleToast';

const ToastPage = () => {
  const { isShowToast, handleToggleToast, setIsShowToast } = useHandleToast();

  const handleToast = () => {
    handleToggleToast();
  };

  return (
    <>
      <button type='button' onClick={handleToast}>
        토스트 나와라!
      </button>
      {isShowToast && (
        <Toast
          message='반갑습니다~'
          type={'warning'}
          isToast={isShowToast}
          handleToast={handleToggleToast}
          setShowToast={setIsShowToast}
        />
      )}
      <button>반갑고</button>
    </>
  );
};

export default ToastPage;
