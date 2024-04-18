const InviteList = () => {
  return (
    <>
      <div className='mb:hidden tb:grid grid-cols-3 px-7 py-7 text-base border-b-[1px] border-bg-tp-gray_600'>
        <div className='pl-6'>프로덕트 디자인</div>
        <div>초대자</div>
        <div className='flex gap-[0.625rem]'>
          <div className='w-[128px] h-8 bg-red-500'>버튼1</div>
          <div className='w-[128px] h-8 bg-red-500'>버튼2</div>
        </div>
      </div>
      <div className='mb:hidden tb:grid grid-cols-3 px-7 py-7 text-base border-b-[1px] border-bg-tp-gray_600'>
        <div className='pl-6'>프로덕트 디자인</div>
        <div>초대자</div>
        <div className='flex gap-[0.625rem]'>
          <div className='w-[128px] h-8 bg-red-500'>버튼1</div>
          <div className='w-[128px] h-8 bg-red-500'>버튼2</div>
        </div>
      </div>

      <div className='tb:hidden flex justify-center flex-col gap-4 p-4  border-b-[1px] border-bg-tp-gray_600'>
        <div className='flex flex-col gap-[0.625rem]'>
          <div className='flex gap-4 text-sm'>
            <div className='text-tp-gray_800'>이름</div>
            <div>프로덕트 디자인</div>
          </div>
          <div className='flex  gap-4 text-sm'>
            <div className='text-tp-gray_800'>초대자</div>
            <div>손동희</div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-[0.625rem]'>
          <div className='w-[109px] h-[14px] bg-red-500'>1</div>
          <div className='w-[109px] h-[14px] bg-red-500'>2</div>
        </div>
      </div>
      <div className='tb:hidden flex justify-center flex-col gap-4 p-4  border-b-[1px] border-bg-tp-gray_600'>
        <div className='flex flex-col gap-[0.625rem]'>
          <div className='flex gap-4 text-sm'>
            <div className='text-tp-gray_800'>이름</div>
            <div>프로덕트 디자인</div>
          </div>
          <div className='flex  gap-4 text-sm'>
            <div className='text-tp-gray_800'>초대자</div>
            <div>손동희</div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-[0.625rem]'>
          <div className='w-[109px] h-[14px] bg-red-500'>1</div>
          <div className='w-[109px] h-[14px] bg-red-500'>2</div>
        </div>
      </div>
    </>
  );
};

export default InviteList;
