'use client';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import React, { useState } from 'react';

import DashboardHeader from '@/components/dashboard/LayoutComponents/header';
// eslint-disable-next-line import/order
import SideMenu from '@/components/dashboard/LayoutComponents/sideMenu';

import '@/styles/globals.css';
import { getAccessToken } from '@/utils/handleToken';

const DashboardLayoutProfile = ({ children }: PropsWithChildren) => {
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const dashboardId = path.split('/')[2];

  console.log('어렵네')
  console.log(dashboardInfo);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = getAccessToken();
      try {
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/dashboards/${dashboardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setDashboardInfo(data);
        } else {
          throw new Error('Failed to fetch dashboard details');
        }
      } catch (error) {
        console.error('Fetching error:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className='flex h-screen w-screen'>
      <SideMenu dashboardId={Number(dashboardId)} />
      <div className='w-full overflow-hidden'>
        <DashboardHeader dashboardId={Number(dashboardId)} />
        <div className='w-full overflow-auto bg-gray-100 h-[calc(100%-60px)] pc:h-[calc(100%-70px)]'>
          {isLoading ? <p>Loading...</p> : children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayoutProfile;