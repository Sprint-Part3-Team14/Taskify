import DashboardHeader from '@/components/dashboard/LayoutComponents/header';
import SideMenu from '@/components/dashboard/LayoutComponents/sideMenu';
import '@/styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const DashboardLayoutProfile = ({ children }: PropsWithChildren) => {
  const dashboardId = '6312';
  return (
    <section className='flex h-screen w-screen'>
      <SideMenu dashboardId={dashboardId} />
      <div className='w-full overflow-hidden'>
        <DashboardHeader dashboardId={dashboardId} />
        <div className='w-full overflow-auto bg-gray-100 h-[calc(100%-60px)] pc:h-[calc(100%-70px)]'>{children}</div>
      </div>
    </section>
  );
};

export default DashboardLayoutProfile;
