import { MouseEvent } from 'react';
import ModalLayout from './ModalLayout';
import { ModalComments } from './constant';
import { I_ModalToggle } from './ModalType';
import ModalButton from './Button/ModalButton';

// 반응형이 적용이 안됨
const WrongPasswordModal = ({ handleModal }: I_ModalToggle) => {
  return (
    <ModalLayout handleModal={handleModal}>
      <p className='text-center pt-[6.8rem] px-[10rem] pb-11 text-black font-extrabold'>
        {ModalComments.wrongPassword}
      </p>
      <ModalButton buttonType='single' secondButton='확인' />
    </ModalLayout>
  );
};

export default WrongPasswordModal;
