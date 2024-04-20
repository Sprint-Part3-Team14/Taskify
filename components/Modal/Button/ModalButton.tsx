import { MouseEvent } from 'react';

const ModalButton = ({
  buttonType,
  firstButton,
  secondButton,
  singleButton,
  onClickFirstButton,
  onClickSecondButton,
  onClick,
}: {
  buttonType: 'double' | 'half' | 'single';
  firstButton?: string;
  secondButton?: string;
  singleButton?: string;
  onClickFirstButton?: (event: MouseEvent<HTMLElement>) => void;
  onClickSecondButton?: (event: MouseEvent<HTMLElement>) => void;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}) => {
  switch (buttonType) {
    case 'double':
      return (
        <div className='flex gap-3 justify-end'>
          <button
            className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg active:bg-slate-50'
            type='button'
            onClick={onClickFirstButton}>
            {firstButton}
          </button>
          <button
            className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg active:bg-[#4729c2] '
            type='button'
            onClick={onClickSecondButton}>
            {secondButton}
          </button>
        </div>
      );
    case 'half':
      return (
        <div className='flex gap-3 justify-end'>
          {firstButton && (
            <button
              onClick={onClick}
              className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg active:bg-slate-50'
              type='button'>
              {firstButton}
            </button>
          )}
          {secondButton && (
            <button
              onClick={onClick}
              className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg active:bg-[#4729c2] '
              type='button'>
              {secondButton}
            </button>
          )}
        </div>
      );
    case 'single':
      return (
        <div className='flex gap-3 justify-end'>
          <button
            onClick={onClick}
            className='text-tp-violet_900 px-8 py-2.5 border border-solid border-tp-gray_700 text-xs rounded-lg active:bg-slate-50'
            type='button'>
            {singleButton}
          </button>
        </div>
      );
  }
};
export default ModalButton;
