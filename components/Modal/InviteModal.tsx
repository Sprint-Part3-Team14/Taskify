import ModalLayout from './ModalLayout';

// 반응형이 적용이 안됨
const InviteModal = () => {
  return (
    <ModalLayout title='초대하기'>
      <form className='flex flex-col gap-1.5 '>
        <label>이메일</label>
        <input
          className='p-4 border border-solid border-tp-gray_700 rounded-lg mb-7 w-[30.0rem]'
          type='text'
          placeholder='이메일을 입력해 주세요'
        />
        <div className='flex gap-3 relative justify-end'>
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
      </form>
    </ModalLayout>
  );
};

export default InviteModal;
