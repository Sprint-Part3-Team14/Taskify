import ModalLayout from './ModalLayout';
import { ModalComments } from './constant';

// 반응형이 적용이 안됨
const WrongPasswordModal = () => {
  return (
    <ModalLayout>
      <p className='text-center pt-[6.8rem] px-[10rem] pb-[7.5rem] text-black font-extrabold mb:px-[4rem] mb:pt-5 mb:text-base mb:'>
        {ModalComments.wrongPassword}
      </p>
      <div className='flex gap-3 absolute right-7 bottom-7'>
        <button
          className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg'
          type='button'>
          확인
        </button>
      </div>
    </ModalLayout>
  );
};

export default WrongPasswordModal;
