import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import SideMenu from './sideMenu';
import DashboardHeader from './Dashboard';

interface Props {
  children: ReactNode;
}

const Dashboard = ({ children }: Props) => {
  const router = useRouter();

  const dashboardId = Array.isArray(router.query.dashboardId) ? router.query.dashboardId[0] : router.query.dashboardId;

  return (
    <div className='flex h-screen w-screen'>
      <SideMenu dashboardId={dashboardId} />
      <div className='w-full overflow-hidden'>
        <DashboardHeader dashboardId={dashboardId} />
        <div className='w-full overflow-auto bg-gray-100 h-[calc(100%-60px)] pc:h-[calc(100%-70px)]'>{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
