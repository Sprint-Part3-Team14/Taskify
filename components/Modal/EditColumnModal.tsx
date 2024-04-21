import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { MouseEvent } from 'react';

interface Props {
  handleModal: (event: MouseEvent<HTMLElement>) => void;
  placeholder: string;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFirstButton?: () => void;
  onClickSecondButton?: () => void;
  onClick: () => void;
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
}: Props) => {
  return (
    <ModalLayout handleModal={handleModal}>
      <form className='flex flex-col h-[11.25rem]'>
        <label className='text-lg'>{title}</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <div className='flex justify-between items-baseline text-tp-gray_800'>
          <button className='text-sm underline' onClick={onClick}>
            삭제하기
          </button>
          <ModalButton
            buttonType='double'
            firstButton='취소'
            secondButton='변경'
            onClickFirstButton={onClickFirstButton}
            onClickSecondButton={onClickSecondButton}
          />
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditColumnModal;
