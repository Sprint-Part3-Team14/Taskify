import Image from 'next/image';

const MydashBoard = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col rounded-md bg-tp-white px-7 pt-8 pb-7 shadow-sm w-[38.75rem]'>
        <div className='flex justify-between'>
          <h1 className='text-[1.25rem] font-bold text-tp-black_700'>비브리지</h1>
          <h2>color</h2>
        </div>
      </div>
      <div className='flex flex-col rounded-md bg-tp-white px-7 pt-8 pb-5 shadow-sm w-[38.75rem]'>
        <div className='flex justify-between'>
          <h1 className='text-[1.25rem] font-bold text-tp-black_700'>비브리지</h1>
          <div className='flex gap-4 items-center'>
            <span>1페이지 중</span>
            <p>뒤로 넘기기</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col rounded-md bg-tp-white px-7 pt-8 pb-5 shadow-sm w-[38.75rem]'>
        <div className='flex justify-between'>
          <h1 className='text-[1.25rem] font-bold text-tp-black_700'>비브리지</h1>
          <div className='flex gap-4 items-center'>
            <span> 1페이지 중</span>
            <p>뒤로 넘기기</p>
            <button>초대하기</button>
          </div>
        </div>
        <p className='text-base text-tp-gray_800 py-6'>이메일</p>
      </div>
      <button
        type='submit'
        className='py-5 px-[5.9375rem] rounded-lg text-tp-black_700 border border-solid border-tp-gray_700 active:bg-tp-gray_600 mt-7'>
        대시보드 삭제하기
      </button>
    </div>
  );
};

export default MydashBoard;
