const TableLayout = ({
  title,
  headerContent,
  tableContent,
}: {
  title: '구성원' | '초대 내역' | '초대받은 대시보드';
  headerContent?: JSX.Element;
  tableContent: JSX.Element;
}) => {
  return (
    <div className='flex flex-col rounded-md bg-tp-white shadow-sm pc:pt-8 pc:pb-7 pt-6 pc:w-[38.75rem] tb:w-[34rem] w-[19rem] pc:h-[35rem] h-[34rem]'>
      <div className='flex justify-between pc:px-7 px-5 items-center'>
        <h1 className='font-bold text-tp-black_700 pc:text-[1.25rem] text-xl'>{title}</h1>
        {headerContent}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2.5'>{tableContent}</div>
      </div>
    </div>
  );
};

export default TableLayout;
