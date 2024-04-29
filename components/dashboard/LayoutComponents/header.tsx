'use client';

import { CrownIcon } from 'constant/importImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import DashboardInfo from './dashboardInfo';
import ProfileInfo from './profileInfo';

import { getDashboardMember } from '@/utils/api/getDashboardMember';
import { getAccessToken } from '@/utils/handleToken';
import { getDashBoardData } from '@/utils/api/getDashBoardData';

interface Props {
  dashboardId?: number;
}

interface I_dashboardData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

const DashboardHeader = ({ dashboardId }: Props) => {
  const [dashboardInfo, setDashboardInfo] = useState<I_dashboardData>({
    id: 0,
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    createdByMe: false,
    userId: 0,
  });
  const [memberList, setMemberList] = useState({ members: [], totalCount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const handleGetDashboardData = async () => {
    setIsLoading(true);
    try {
      const result = await getDashBoardData(dashboardId);
      setDashboardInfo(result);
      const { members, totalCount } = await getDashboardMember({ dashboard: Number(dashboardId) });
      setMemberList({ members: members, totalCount: totalCount });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetDashboardData();
  }, [dashboardId]);

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
        {dashboardId && (
          <DashboardInfo createdByMe={dashboardInfo.createdByMe} dashboardId={dashboardId} memberList={memberList} />
        )}
        <ProfileInfo />
      </div>
    </div>
  );
};

export default DashboardHeader;
