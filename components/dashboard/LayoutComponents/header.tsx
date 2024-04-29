'use client';

import { CrownIcon } from 'constant/importImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import DashboardInfo from './dashboardInfo';
import ProfileInfo from './profileInfo';

import { getAccessToken } from '@/utils/handleToken';

interface Props {
  dashboardId?: string;
}

const DashboardHeader = ({ dashboardId }: Props) => {
  const [dashboardInfo, setDashboardInfo] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = getAccessToken();
      try {
        const dashboardResponse = await fetch(`https://sp-taskify-api.vercel.app/4-14/dashboards/${dashboardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (dashboardResponse.ok) {
          const dashboardData = await dashboardResponse.json();
          setDashboardInfo(dashboardData);
        } else {
          throw new Error('Failed to fetch dashboard details');
        }

        const membersResponse = await fetch(`https://sp-taskify-api.vercel.app/4-14/members`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (membersResponse.ok) {
          const membersData = await membersResponse.json();
          setMemberList({ members: membersData.members, totalCount: membersData.totalCount });
        } else {
          throw new Error('Failed to fetch members');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (dashboardId) {
      fetchData();
    }
    console.log(dashboardInfo);
    console.log(memberList);
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
        {/* <DarkModeButton /> */}
        {dashboardId && (
          <DashboardInfo createdByMe={dashboardInfo.createdByMe} dashboardId={dashboardId} memberList={memberList} />
        )}
        <ProfileInfo />
      </div>
    </div>
  );
};

export default DashboardHeader;
