'use client';

import { ButtonHTMLAttributes } from 'react';

import Image from 'next/image';

import IconArrowExport from '@/public/icon/arrow_drop_down.svg';
import IconArrowForward from '@/public/icon/arrow_forward.svg';

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

const Pagination = ({ onLeftClick, onRightClick, leftDisabled, rightDisabled }: Props) => {
  const leftArrowColor = leftDisabled ? ARROW_COLOR.disabled : ARROW_COLOR.enabled;
  const rightArrowColor = rightDisabled ? ARROW_COLOR.disabled : ARROW_COLOR.enabled;

  return (
    <div className='flex'>
      <button
        onClick={onLeftClick}
        disabled={leftDisabled}
        className='flex border-solid-gray justify-center items-center h-[40px] w-[40px] rounded-l-sm'>
        <Image src={IconArrowForward} alt='arrowleft' />
      </button>
      <button
        onClick={onRightClick}
        disabled={rightDisabled}
        className='flex border-solid-gray justify-center items-center h-[40px] w-[40px] rounded-l-sm'>
        <Image src={IconArrowExport} alt='arrowright' width={20} height={20} />
      </button>
    </div>
  );
};

export default Pagination;
