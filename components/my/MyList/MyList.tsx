const MyList = () => {
  let count = 0;
  let show = true;
  count > 6 ? show : !show;
  return (
    <div className='flex flex-col gap-1 max-w-[63.875rem]  '>
      <div className='flex flex-wrap gap-3 tb:gap-[0.625rem] tb:flex-wrap'>
        <div className='bg-slate-500 w-[332px] h-[70px] '>임시버튼</div>
        <div className='bg-slate-500 w-[332px] h-[70px] '>임시버튼</div>
        <div className='bg-slate-500 w-[332px] h-[70px] '>임시버튼</div>
        <div className='bg-slate-500 w-[332px] h-[70px] '>임시버튼</div>
        <div className='bg-slate-500 w-[332px] h-[70px] '>임시버튼</div>
      </div>

      {!show && (
        <div className='flex justify-end items-center w-full gap-4'>
          <div className='mb:text-xs tb:text-sm'>1 페이지 중 1</div>
          <div className='flex'>
            <div className='flex items-center w-10 h-10'>좌</div>
            <div className='flex items-center w-10 h-10'>우</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;
