import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';

const EditColumnModal = ({ handleModal }: I_ModalToggle) => {
  return (
    <ModalLayout handleModal={handleModal} title='컬럼 관리'>
      <form className='flex flex-col h-[11.25rem]'>
        <label className='text-lg'>이름</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder='이메일을 입력해 주세요'
        />
        <ModalButton buttonType='double' firstButton='취소' secondButton='변경' />
      </form>
    </ModalLayout>
  );
};

export default EditColumnModal;
