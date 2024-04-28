import { useInputValue } from '@/hooks/useInputValue';
import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';
import { postInvitation } from '@/utils/api/postInvitation';

const InviteModal = ({ handleModal, dashboardId }: I_ModalToggle) => {
  const { inputValue, onChange } = useInputValue();

  const handlePostInvitation = async () => {
    try {
      const result = await postInvitation({ email: inputValue, dashboardId: dashboardId });
      alert('초대가 완료되었습니다.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <ModalLayout handleModal={handleModal} title='초대하기'>
      <form className='flex flex-col gap-1.5 '>
        <label className='mb-2.5'>이메일</label>
        <input
          onChange={onChange}
          className='p-4 border border-solid border-tp-gray_700 rounded-lg mb-7 w-[30.0rem] outline-tp-violet_900'
          type='text'
          placeholder='이메일을 입력해 주세요'
        />
        <ModalButton
          buttonType='double'
          firstButton='취소'
          secondButton='초대'
          onClickFirstButton={handleModal}
          onClickSecondButton={handlePostInvitation}
        />
      </form>
    </ModalLayout>
  );
};

export default InviteModal;
