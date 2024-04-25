'use Client';

import { MouseEvent, ChangeEvent, useState, useRef } from 'react';

import Image from 'next/image';

import ModalLayout from './ModalLayout';
import ModalButton from './Button/ModalButton';

import { useEffectOnce } from '@/hooks/useEffectOnce';

import { COLOR_LIST, INITIAL_COLOR } from '../MyInvitation/constants';

interface I_ModalToggle {
  handleModal: (event: MouseEvent<HTMLElement>) => void;
  onSelectColor?: (color: string) => void;
  onChange?: (title: string) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onClickFirstButton?: (event: MouseEvent<HTMLElement>) => void;
  onClickSecondButton?: (event: MouseEvent<HTMLElement>) => void;
}

const CreateDashboardModal = ({
  handleModal,
  onClickFirstButton,
  onClickSecondButton,
  onSelectColor,
  onChange,
}: I_ModalToggle) => {
  const [inputValue, setInputValue] = useState('');
  const [selectColor, setSelectColor] = useState(INITIAL_COLOR);
  const selectColorList = COLOR_LIST;
  const inputRef = useRef(null);

  useEffectOnce(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleSelectColor = (color: string) => {
    setSelectColor(color);
    onSelectColor(color);
  };
  return (
    <ModalLayout handleModal={handleModal} title='컬럼 관리'>
      <form className='flex flex-col h-[14.5rem]'>
        <label className='text-lg'>새로운 대시 보드</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder='뉴 프로젝트'
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className='flex items-center gap-2.5 mb-7'>
          {selectColorList.map(color => {
            return (
              <button
                type='button'
                key={color}
                id={color}
                onClick={() => handleSelectColor(color)}
                className='w-[1.875rem] h-[1.875rem] relative'>
                {selectColor === color && (
                  <div className='w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <Image fill src='/icon/white_check.svg' alt='선택된 색상' />
                  </div>
                )}
                <div className='min-w-full min-h-full rounded-full' style={{ backgroundColor: color }} />
              </button>
            );
          })}
        </div>
        <ModalButton
          onClickFirstButton={onClickFirstButton}
          onClickSecondButton={onClickSecondButton}
          buttonType='double'
          firstButton='취소'
          secondButton='생성'
        />
      </form>
    </ModalLayout>
  );
};

export default CreateDashboardModal;
