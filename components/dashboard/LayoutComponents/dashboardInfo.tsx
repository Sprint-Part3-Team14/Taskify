import { ManageButton } from './Buttons';
import Members, { MembersProps } from './members';

interface DashboardInfoProps {
  createdByMe?: boolean;
  memberList?: MembersProps;
  dashboardId: string;
}

const DashboardInfo = ({ createdByMe = false, memberList, dashboardId }: DashboardInfoProps) => {
  return (
    <div className='flex items-center justify-center h-[34px] gap-4 border-r border-tp-gray_700 pr-3 text-tp-gray_900 tb:h-[38px] tb:gap-[23px] tb:pr-6 pc:gap-10'>
      <ManageButton createdByMe={createdByMe} dashboardId={dashboardId} />
      {memberList && <Members members={memberList.members} totalCount={memberList.totalCount} />}
    </div>
  );
};

export default DashboardInfo;
