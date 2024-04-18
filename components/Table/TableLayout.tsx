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
    <div className='flex flex-col rounded-md bg-tp-white pt-8 pb-7 shadow-sm w-[38.75rem]'>
      <div className='flex justify-between px-7'>
        <h1 className='text-[1.25rem] font-bold text-tp-black_700'>{title}</h1>
        {headerContent && headerContent}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2.5'>{tableContent}</div>
      </div>
    </div>
  );
};

export default TableLayout;
