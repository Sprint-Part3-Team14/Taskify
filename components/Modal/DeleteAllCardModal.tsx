import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';
import { I_ModalToggle } from './ModalType';
import { ModalComments } from './constant';

const DeleteAllCardModal = ({ handleModal }: I_ModalToggle) => {
  return (
    <ModalLayout handleModal={handleModal}>
      <p className='text-center pt-[6.75rem] px-40 pb-11 text-black font-extrabold'>{ModalComments.deleteAllColumn}</p>
      <ModalButton buttonType='double' firstButton='취소' secondButton='삭제' />
    </ModalLayout>
  );
};

export default DeleteAllCardModal;
