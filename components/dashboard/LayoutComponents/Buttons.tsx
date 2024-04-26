import { PlusBlueIcon, SettingIcon } from 'constant/importImage';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardInfoProps {
  createdByMe?: boolean;
  memberList?: MembersProps;
  dashboardId: string;
}

const ManageButton = ({ createdByMe = false, dashboardId }: DashboardInfoProps) => {
  return (
    <div className='flex justify-center items-center gap-4'>
      {createdByMe && (
        <Link href={`/dashboard/${dashboardId}/edit`}>
          <button>
            <div className='hidden pr-8 tablet:block'>
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

const InvitationButton = ({ dashboardId }: InvitationButtonProps) => {
  return (
    <>
      <button>
        <div className='hidden pr-8 tablet:block'>
          <Image src={PlusBlueIcon} alt='더하기 버튼' />
        </div>
        초대하기
      </button>
    </>
  );
};

export default ManageButton;
InvitationButton;
