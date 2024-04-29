import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';
import { ModalComments } from './constant';

// 반응형이 적용이 안됨
const WrongPasswordModal = ({ handleModal }: I_ModalToggle) => {
  return (
    <ModalLayout handleModal={handleModal}>
      <p className='text-center pt-[6.8rem] px-[10rem] pb-11 text-black font-extrabold'>
        {ModalComments.wrongPassword}
      </p>
      <ModalButton buttonType='half' secondButton='확인' onClick={handleModal} />
    </ModalLayout>
  );
};

export default WrongPasswordModal;
