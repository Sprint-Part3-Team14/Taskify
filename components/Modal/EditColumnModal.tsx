import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';

import { MouseEvent } from 'react'; //추가

interface Props {
  handleModal: (event: MouseEvent<HTMLElement>) => void;
  placeholder: string;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFirstButton?: () => void;
  onClickSecondButton?: () => void;
}

const EditColumnModal = ({
  handleModal,
  placeholder,
  title,
  value,
  onChange,
  onClickFirstButton,
  onClickSecondButton,
}: Props) => {
  return (
    <ModalLayout handleModal={handleModal}>
      {/* 변경 */}
      <form className='flex flex-col h-[11.25rem]'>
        <label className='text-lg'>{title}</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder={placeholder}
          onChange={onChange}
          value={value} //변경
        />
        <ModalButton
          buttonType='double'
          firstButton='취소'
          secondButton='변경'
          onClickFirstButton={onClickFirstButton}
          onClickSecondButton={onClickSecondButton}
        />
      </form>
    </ModalLayout>
  );
};

export default EditColumnModal;
