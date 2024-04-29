import { MouseEvent, useRef } from 'react';

import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';

interface I_EditColumn {
  handleModal: (event: MouseEvent<HTMLElement>) => void;
  placeholder: string;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFirstButton?: () => void;
  onClickSecondButton?: () => void;
  onClick: () => void;
  newColumnTitle: string;
}

const EditColumnModal = ({
  handleModal,
  placeholder,
  title,
  value,
  onChange,
  onClickFirstButton,
  onClickSecondButton,
  onClick,
  newColumnTitle,
}: I_EditColumn) => {
  const isDisabled = newColumnTitle.trim() === '';
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClickSecondButton();
  };
  return (
    <ModalLayout handleModal={handleModal}>
      <form onSubmit={handleSubmit} className='flex flex-col h-[11.25rem]'>
        <label className='text-lg'>{title}</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg tb:w-[30.0rem] mb:w-[25rem]'
          type='text'
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          ref={inputRef}
        />
        <div className='flex justify-between items-baseline text-tp-gray_800'>
          <button type='button' className='text-sm underline' onClick={onClick}>
            삭제하기
          </button>
          <ModalButton
            buttonType='double'
            firstButton='취소'
            secondButton='변경'
            onClickFirstButton={onClickFirstButton}
            onClickSecondButton={onClickSecondButton}
            isDisabled={isDisabled}
          />
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditColumnModal;
