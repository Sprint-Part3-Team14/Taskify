import { ChangeEvent } from 'react';
import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';

interface I_CreateColumn {
  handleModal: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSecondButton: () => void;
}

const CreateColumnModal = ({ handleModal, onChange, onClickSecondButton }: I_CreateColumn) => {
  return (
    <ModalLayout handleModal={handleModal} title='새 컬럼 생성'>
      <form className='flex flex-col'>
        <label className='text-lg'>이름</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder='새로운 프로젝트'
          onChange={onChange}
        />
        <ModalButton
          onClickFirstButton={handleModal}
          onClickSecondButton={onClickSecondButton}
          buttonType='double'
          firstButton='취소'
          secondButton='생성'
        />
      </form>
    </ModalLayout>
  );
};

export default CreateColumnModal;
