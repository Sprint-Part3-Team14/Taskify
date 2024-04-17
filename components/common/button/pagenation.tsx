import { ButtonHTMLAttributes } from 'react';

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

const Pagenation = ({ onLeftClick, onRightClick, leftDisabled, rightDisabled }: Props) => {
  const leftArrowColor = leftDisabled ? ARROW_COLOR.disabled : ARROW_COLOR.enabled;
  const rightArrowColor = rightDisabled ? ARROW_COLOR.disabled : ARROW_COLOR.enabled;

  return (
    <div className='flex'>
      <button
        onClick={onLeftClick}
        disabled={leftDisabled}
        className='border-solid-gray flex-center h-[40px] w-[40px] rounded-l-sm'>
        <IconArrowForward fill={leftArrowColor} />
      </button>
      <button
        onClick={onRightClick}
        disabled={rightDisabled}
        className='border-solid-gray flex-center h-[40px] w-[40px] rounded-l-sm'>
        <IconArrowForward fill={rightArrowColor} />
      </button>
    </div>
  );
};

export default Pagenation;
