const TableLayout = ({
  title,
  headerContent,
  tableContent,
}: {
  title: '구성원' | '초대 내역' | '초대받은 대시보드';
  headerContent?: JSX.Element;
  tableContent: JSX.Element[];
}) => {
  return (
    <div className='flex flex-col rounded-md bg-tp-white shadow-sm pc:pt-8 pc:pb-7 mb:pt-6 pc:w-[38.75rem] tb:w-[34rem] mb:w-[17.75rem]'>
      <div className='flex justify-between pc:px-7 mb:px-5'>
        <h1 className='font-bold text-tp-black_700 pc:text-[1.25rem] mb:text-xl'>{title}</h1>
        {headerContent && headerContent}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2.5'>{tableContent}</div>
      </div>
    </div>
  );
};

export default TableLayout;
