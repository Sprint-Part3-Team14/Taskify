import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';

// 반응형이 적용이 안됨
const InviteModal = ({ handleModal }: I_ModalToggle) => {
  return (
    <ModalLayout handleModal={handleModal} title='초대하기'>
      <form className='flex flex-col gap-1.5 '>
        <label className='mb-2.5'>이메일</label>
        <input
          className='p-4 border border-solid border-tp-gray_700 rounded-lg mb-7 w-[30.0rem]'
          type='text'
          placeholder='이메일을 입력해 주세요'
        />
        <ModalButton buttonType='double' firstButton='취소' secondButton='삭제' />
      </form>
    </ModalLayout>
  );
};

export default InviteModal;
