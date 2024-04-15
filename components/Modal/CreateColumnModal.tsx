import ModalLayout from './ModalLayout';

// 반응형이 적용이 안됨
const CreateColumnModal = () => {
  return (
    <ModalLayout title='새 컬럼 생성'>
      <form className='flex flex-col'>
        <label className='text-lg'>이름</label>
        <input
          className='p-4 border border-solid mt-2.5 mb-7 border-tp-gray_700 rounded-lg w-[30.0rem]'
          type='text'
          placeholder='새로운 프로젝트'
        />

        <div className='flex gap-3 justify-end'>
          <button
            className='font-medium text-tp-gray_900 px-[2.9rem] py-3.5 border border-solid border-tp-gray_700 text-base rounded-lg mb:px-14 mb:py-3'
            type='button'>
            취소
          </button>
          <button
            className='font-medium text-white bg-tp-violet_900 px-[2.9rem] py-3.5 text-base rounded-lg'
            type='button'>
            변경
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default CreateColumnModal;
