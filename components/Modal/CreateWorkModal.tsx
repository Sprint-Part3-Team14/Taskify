import ModalDropdown from './Input/ModalDropdown';
import ModalLayout from './ModalLayout';

const CreateWorkModal = () => {
  return (
    <ModalLayout handleModal={() => {}} title='할 일 생성'>
      <div className='flex gap-4'>
        <ModalDropdown title='상태' />
        <ModalDropdown title='담당자' />
      </div>
      <div className='flex flex-col gap-2.5 '>
        <label className='flex gap-1 font-extrabold text-lg'>
          제목<span className='text-tp-violet_900 '>*</span>
        </label>
        <input
          type='text'
          placeholder='제목을 입력해 주세요'
          className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900'
        />
      </div>
      <div className='flex flex-col gap-2.5'>
        <label className='flex gap-1 font-extrabold text-lg'>
          설명<span className='text-tp-violet_900 '>*</span>
        </label>
        <div className='relative inline'>
          <textarea
            id='Comments'
            placeholder='설명을 입력해 주세요'
            className='text-sm w-[28.125rem] h-[6rem] border border-solid border-tp-gray_700 rounded-lg pt-4 px-4 pb-11 outline-tp-violet_900 relative placeholder:text-sm'
          />
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <label className='flex gap-1 font-extrabold text-lg'>마감일</label>
        <input
          type='date'
          placeholder='날짜를 입력해 주세요'
          className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900'
        />
      </div>
      <div className='flex flex-col gap-2.5 '>
        <label className='flex gap-1 font-extrabold text-lg'>태그</label>
        <input
          type='text'
          placeholder='입력 후 Enter'
          className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900'
        />
      </div>
      <div className='flex flex-col gap-2.5 '>
        <label className='flex gap-1 font-extrabold text-lg'>이미지</label>
        <input type='image' />
      </div>
    </ModalLayout>
  );
};

export default CreateWorkModal;
