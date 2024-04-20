import ModalButton from './Button/ModalButton';
import ModalLayout from './ModalLayout';

const SuccessPasswordChangeModal = ({ handleModal }) => {
  return (
    <ModalLayout handleModal={handleModal}>
      <p className='text-center pt-[6.8rem] px-[10rem] pb-11 text-black font-extrabold'>
        비밀번호가 성공적으로 변경되었습니다.
      </p>
      <ModalButton buttonType='half' secondButton='확인' onClick={handleModal} />
    </ModalLayout>
  );
};

export default SuccessPasswordChangeModal;
