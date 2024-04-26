'use client';

import { removeAccessToken } from '@/utils/handleToken';
import { CrownIcon, PlusBlueIcon, SettingIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import Members, { MembersProps } from './Members';

interface Props {
  dashboardId?: string;
}

const DashboardHeader = ({ dashboardId }: Props) => {
  const dashboardInfo = {
    title: '임시 제목',
    createdByMe: true,
  };

  const title = dashboardId ? dashboardInfo?.title : '내 대시보드';
  return (
    <div className='sticky top-0 z-10 flex h-[60px] w-full flex-row items-center justify-between border-b border-solid border-tp-gray-300 bg-white pl-[24px] pr-[12px] tb:h-[70px] tb:px-[40px] pc:flex-row pc:pr-[80px]'>
      <div className='flex text-xl font-bold pl-1 pt-1 gap-2 items-center'>
        {title}
        <div className={dashboardInfo.createdByMe ? '' : 'hidden'}>
          <Image src={CrownIcon} width={18} height={28} alt='왕관' />
        </div>
      </div>
      <div className='flex justify-center right items-center text-base font-normal gap-3 tb:gap-8'>
        {/* <DarkModeButton /> */}
        {/* {dashboardId && (
          // <DashboardInfo
          //   createdByMe={dashboardInfo.createdByMe}
          //   dashboardId={dashboardId}
          //   memberList={dashboardMembers}
          // />
        )} */}
        <ProfileInfo />
      </div>
    </div>
  );
};

export default DashboardHeader;

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

const ProfileInfo = () => {
  const loginInfo = {
    id: 1,
    nickname: '홍길동',
    profileImageUrl: '',
  };
  const myProfile = {
    id: loginInfo.id ?? 1,
    nickname: loginInfo.nickname ?? '홍길동',
    profileImageUrl: loginInfo.profileImageUrl ?? 'https://unsplash.com/photos/a_specific_photo_id',
  };

  return (
    <div className='justify-center items-center group relative gap-3'>
      <Link href='/myinvitation' className='flex justify-center items-center gap-3'>
        <Members members={[myProfile]} totalCount={1} />
        <div className='block text-base font-medium tablet:block'>{myProfile.nickname}</div>
      </Link>
      <ProfilePopup />
    </div>
  );
};

const ProfilePopup = () => {
  const router = useRouter();
  const goMyPage = () => {
    router.push('/myinvitation');
  };

  const logout = () => {
    removeAccessToken();
    router.push('/signin');
  };

  return (
    <div className='absolute -right-3 top-6 hidden bg-transparent pt-5 group-hover:block'>
      <div className='flex h-[100px] w-[130px] flex-col justify-center overflow-hidden rounded-md bg-tp-white shadow-tp-black_800'>
        <ProfilePopupButton onClick={goMyPage}>마이 페이지</ProfilePopupButton>
        <ProfilePopupButton onClick={logout}>로그아웃</ProfilePopupButton>
      </div>
    </div>
  );
};

interface ProfilePopupButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const ProfilePopupButton = ({ onClick, children }: ProfilePopupButtonProps) => {
  return (
    <button
      className='justify-center items-center text-base font-semibold h-[50px] w-full hover:bg-tp-violet_100 hover:text-tp-violet_900'
      onClick={onClick}>
      {children}
    </button>
  );
};

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
