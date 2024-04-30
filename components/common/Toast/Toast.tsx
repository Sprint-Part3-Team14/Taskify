import { CloseIcon, CompleteIcon, ErrorIcon, WarningIcon } from 'constant/importImage';
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';

import ModalPortal from '@/components/Modal/Portal';


interface I_Toast {
  message: string;
  type: 'error' | 'complete' | 'warning';
  isToast: boolean;
  handleToast: (event: MouseEvent<HTMLButtonElement>) => void;
  setShowToast: any;
}

const Toast = ({ message, type, isToast, handleToast, setShowToast }: I_Toast) => {
  const [up, setUp] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setUp(false);
    }, 2000);
    const t2 = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setShowToast]);

  switch (type) {
    case 'error': {
      return (
        isToast && (
          <ModalPortal>
            <div
              className={
                up
                  ? 'fixed animate-showToast top-[5rem] left-1/2 -translate-x-1/2 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow z-50'
                  : 'fixed animate-closeToast top-[5rem] left-1/2 -translate-x-1/2 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow z-50'
              }>
              <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg'>
                <div className='relative w-5 h-5'>
                  <Image fill src={ErrorIcon} alt='에러 아이콘' />
                </div>
              </div>
              <div className='ms-3 text-sm font-normal'>{message}</div>
              <button
                onClick={handleToast}
                type='button'
                className='absolute right-2.5 inline-flex items-center justify-center h-8 w-8 -mx-1.5 -my-1.5 p-1.5 rounded-lg bg-white text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 '>
                <div className='relative w-3 h-3'>
                  <Image fill src={CloseIcon} alt='창 닫기' />
                </div>
              </button>
            </div>
          </ModalPortal>
        )
      );
    }
    case 'complete': {
      return (
        isToast && (
          <ModalPortal>
            <div
              className={
                up
                  ? 'fixed animate-showToast top-[5rem] left-1/2 -translate-x-1/2 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow z-50 '
                  : 'fixed animate-closeToast top-[5rem] left-1/2 -translate-x-1/2 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow z-50 '
              }>
              <div className='inline-flex items-center justify-center flex-shrink-0 text-green-500 bg-green-100 rounded-lg '>
                <div className='relative w-7 h-7'>
                  <Image fill src={CompleteIcon} alt='완료 아이콘' />
                </div>
              </div>
              <div className='ms-3 text-sm font-normal'>{message}</div>
              <button
                onClick={handleToast}
                type='button'
                className='absolute right-2.5 inline-flex items-center justify-center ml-1.5 h-8 w-8 -my-1.5 p-1.5 rounded-lg bg-white text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200'>
                <div className='relative w-5 h-5'>
                  <Image fill src={CloseIcon} alt='창 닫기' />
                </div>
              </button>
            </div>
          </ModalPortal>
        )
      );
    }
    case 'warning': {
      return (
        isToast && (
          <ModalPortal>
            <div
              className={
                up
                  ? 'fixed animate-showToast top-[5rem] left-1/2 -translate-x-1/2 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow z-50'
                  : 'fixed animate-closeToast top-[5rem] left-1/2 -translate-x-1/2 flex items-center w-full max-w-md p-4 mb-4 text-gray-500 bg-white rounded-lg shadow z-50'
              }>
              <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg '>
                <div className='relative w-5 h-5'>
                  <Image fill src={WarningIcon} alt='경고 아이콘' />
                </div>
              </div>
              <div className='ms-3 text-sm font-normal'>{message}</div>
              <button
                onClick={handleToast}
                type='button'
                className='absolute right-2.5 inline-flex items-center justify-center h-8 w-8 -mx-1.5 -my-1.5 p-1.5 rounded-lg bg-white text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 '>
                <div className='relative w-5 h-5'>
                  <Image fill src={CloseIcon} alt='창 닫기' />
                </div>
              </button>
            </div>
          </ModalPortal>
        )
      );
    }
  }
};

export default Toast;
