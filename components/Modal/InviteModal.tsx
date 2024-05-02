import { MouseEvent } from 'react';
import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';

import { useInputValue } from '@/hooks/useInputValue';
import { postInvitation } from '@/utils/api/postInvitation';

interface I_InviteModalProps extends I_ModalToggle {
  handleToggleToast: () => void;
  handleToastMessage: (string) => void;
  handleToastType: (I_ToastType) => void;
}

type I_ToastType = 'complete' | 'error';

const InviteModal = ({
  handleModal,
  dashboardId,
  dataHandler,
  handleToggleToast,
  handleToastMessage,
  handleToastType,
}: I_InviteModalProps) => {
  const { inputValue, onChange } = useInputValue();

  const handlePostInvitation = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await postInvitation({ email: inputValue, dashboardId: dashboardId });
      handleToggleToast();
      handleToastMessage('초대가 완료되었습니다.');
      handleToastType('complete');
      dataHandler();
      handleModal(event);
    } catch (error: any) {
      handleToggleToast();
      handleToastMessage(error.message);
      handleToastType('error');
    }
  };

  return (
    <>
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
    </>
  );
};

export default InviteModal;
