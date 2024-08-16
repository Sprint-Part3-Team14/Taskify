'use client';

import { ChangeEvent, useEffect, useRef } from 'react';

import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';

interface I_CreateColumn {
  handleModal: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSecondButton: () => void;
  newColumnTitle: string;
}

const CreateColumnModal = ({ handleModal, onChange, onClickSecondButton, newColumnTitle }: I_CreateColumn) => {
  const isDisabled = newColumnTitle.trim() === '';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClickSecondButton();
  };

  return (
    <ModalLayout handleModal={handleModal} title='새 컬럼 생성'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label className='text-lg'>이름</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg tb:w-[30.0rem] mb:w-[25rem] '
          type='text'
          placeholder='새로운 프로젝트'
          onChange={onChange}
          ref={inputRef}
        />
        <ModalButton
          onClickFirstButton={handleModal}
          onClickSecondButton={onClickSecondButton}
          buttonType='double'
          firstButton='취소'
          secondButton='생성'
          isDisabled={isDisabled}
        />
      </form>
    </ModalLayout>
  );
};

export default CreateColumnModal;
