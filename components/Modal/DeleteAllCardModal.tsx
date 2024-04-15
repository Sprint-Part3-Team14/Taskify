import ModalLayout from './ModalLayout';
import { ModalComments } from './constant';

// 반응형이 적용이 안됨
const DeleteAllCardModal = () => {
  return (
    <ModalLayout>
      <p className='text-center pt-[6.8rem] px-[10rem] pb-[7.5rem] text-black font-extrabold mb:px-[4rem] mb:pt-5 mb:text-base mb:'>
        {ModalComments.deleteAllColumn}
      </p>
      <div className='flex gap-3 absolute right-7 bottom-7'>
        <button
          className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg mb:px-14 mb:py-3'
          type='button'>
          취소
        </button>
        <button
          className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg'
          type='button'>
          삭제
        </button>
      </div>
    </ModalLayout>
  );
};

export default DeleteAllCardModal;
