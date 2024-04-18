const MyList = () => {
  let count = 0;
  let show = true;
  count > 6 ? show : !show;
  return (
    <div className='flex flex-col gap-1 w-full  '>
      <div className='grid grid-rows-1 grid-cols-3 [&>*:nth-child(-n+3)]:grid-rows-2 gap-3 overflow-x-auto'>
        <div className='bg-slate-500  h-[70px] '>임시버튼</div>
        <div className='bg-slate-500  h-[70px] '>임시버튼</div>
        <div className='bg-slate-500  h-[70px] '>임시버튼</div>
        <div className='bg-slate-500  h-[70px] '>임시버튼</div>
        <div className='bg-slate-500  h-[70px] '>임시버튼</div>
      </div>
      <div className='flex justify-end items-center w-full gap-4'>
        {!show && (
          <>
            <div className='text-sm'>1 페이지 중 1</div>
            <div className='flex'>
              <div className='flex items-center w-10 h-10'>좌</div>
              <div className='flex items-center w-10 h-10'>우</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyList;
