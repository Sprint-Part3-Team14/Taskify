const InviteList = () => {
  return (
    <div className='grid grid-cols-3 px-7 py-7 text-base border-b-[1px] border-bg-tp-gray_600'>
      <div className='pl-10'>프로덕트 디자인</div>
      <div>초대자</div>
      <div className='flex gap-[10px]'>
        <div className='w-[128px] h-8 bg-red-500'>버튼1</div>
        <div className='w-[128px] h-8 bg-red-500'>버튼2</div>
      </div>
    </div>
  );
};

export default InviteList;
