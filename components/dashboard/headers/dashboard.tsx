import IconCrown from '@public'

interface Props {
  dashboardId?: string;
}

const DashboardHeader = ({ dashboardId }: Props) => {
  const dashboardInfo = {
    title: '임시 제목',
    createdByMe : true;
  };

  const title = dashboardId ? dashboardInfo?.title : '내 대시보드';
  return (
    <div className='sticky top-0 z-10 flex h-[60px] w-full flex-row-reverse items-center justify-between border-b border-solid border-tp-gray-300 bg-white pl-[24px] pr-[12px] tablet:h-[70px] tablet:px-[40px] pc:flex-row pc:pr-[80px]'>
      <div className='text-xl font-bold pl-1 pt-1 gap-2 items-center'>
        {title}
        
      </div>
    </div>
  );
};

export default DashboardHeader;
