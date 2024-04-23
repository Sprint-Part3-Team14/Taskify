'use client';

import { ButtonHTMLAttributes } from 'react';

import Image from 'next/image';

const ICON_ARROW_BACKWARD = '/icon/arrow_backward.svg';
const ICON_ARROW_FOWARD = '/icon/arrow_forward.svg';

const ARROW_COLOR = {
  enabled: '#333236',
  disabled: '#D9D9D9',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

const MyPagination = ({ onLeftClick, onRightClick, leftDisabled, rightDisabled }: Props) => {
  const leftArrowColor = leftDisabled ? ARROW_COLOR.disabled : ARROW_COLOR.enabled;
  const rightArrowColor = rightDisabled ? ARROW_COLOR.disabled : ARROW_COLOR.enabled;

  return (
    <div className='flex'>
      <button
        onClick={onLeftClick}
        disabled={leftDisabled}
        className='flex border-solid-gray justify-center items-center h-[40px] w-[40px] bg-tp-white  border border-tp-gray_700 rounded-l-[4px]'>
        <Image src={ICON_ARROW_FOWARD} alt='arrowleft' width={16} height={16} />
      </button>
      <button
        onClick={onRightClick}
        disabled={rightDisabled}
        className='flex border-solid-gray justify-center items-center h-[40px] w-[40px] bg-tp-white border border-tp-gray_700 rounded-r-[4px]'>
        <Image src={ICON_ARROW_BACKWARD} alt='arrowright' width={16} height={16} />
      </button>
    </div>
  );
};

export default MyPagination;
