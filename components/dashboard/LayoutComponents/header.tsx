'use client';

import { removeAccessToken } from '@/utils/handleToken';
import { CrownIcon, PlusBlueIcon, SettingIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import DashboardInfo from './dashboardInfo';
import ProfileInfo from './profileInfo';

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
          <DashboardInfo
            createdByMe={dashboardInfo.createdByMe}
            dashboardId={dashboardId}
            memberList={dashboardMembers}
          />
        )} */}
        <ProfileInfo />
      </div>
    </div>
  );
};

export default DashboardHeader;
