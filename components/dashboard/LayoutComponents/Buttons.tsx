import { PlusBlueIcon, SettingIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';

import { MembersProps } from './members';

interface DashboardInfoProps {
  createdByMe?: boolean;
  memberList?: MembersProps;
  dashboardId: string;
}

export const ManageButton = ({ createdByMe = false, dashboardId }: DashboardInfoProps) => {
  return (
    <div className='flex justify-center items-center gap-3'>
      {createdByMe && (
        <Link href={`/dashboard/${dashboardId}/edit`}>
          <button className='flex justify-center items-center w-[85px] border border-gray-400 rounded-lg'>
            <div className='hidden pr-2 tb:block'>
              <Image src={SettingIcon} alt='톱니바퀴' />
            </div>
            관리
          </button>
        </Link>
      )}
      <InvitationButton dashboardId={dashboardId} />
    </div>
  );
};

interface InvitationButtonProps {
  dashboardId: string;
}

export const InvitationButton = ({ dashboardId }: InvitationButtonProps) => {
  return (
    <>
      <button className='flex justify-center items-center border w-[109px] border-gray-400 rounded-lg'>
        <div className='hidden pr-2 tb:block'>
          <Image src={PlusBlueIcon} alt='더하기 버튼' />
        </div>
        초대하기
      </button>
    </>
  );
};
