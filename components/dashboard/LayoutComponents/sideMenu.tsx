'use client';

import { CrownIcon, PlusIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, memo } from 'react';

import logo from '@/public/images/logo/logo_large.jpg';
import { getAccessToken } from '@/utils/handleToken';

interface Props {
  dashboardId?: string;
}

const SideMenu = ({ dashboardId }: Props) => {
  const [dashboardInfo, setDashboardInfo] = useState([
    {
      id: 0,
      title: '',
      color: '',
      createdAt: '',
      updatedAt: '',
      createdByMe: false,
      userId: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = getAccessToken();
      try {
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/dashboards/${dashboardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch dashboard details');
        const data = await response.json();
        setDashboardInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    }

    if (dashboardId) {
      fetchData();
    }
  }, [dashboardId]);

  return (
    <div className='sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-300 flex flex-col'>
      <div className='flex items-center ml-2 p-6'>
        <Link href='/'>
          <div aria-label='Go to homepage'>
            <Image src={logo} width={110} height={34} alt='Logo' />
          </div>
        </Link>
      </div>
      <div className='flex items-center justify-between p-8 mt-12'>
        <p className='text-xs font-bold text-gray-700'>Dashboards</p>
        <button aria-label='Add new dashboard' onClick={() => console.log('Add Modal connection')}>
          <Image src={PlusIcon} width={20} height={20} alt='Add new dashboard' />
        </button>
      </div>
      <ul className='flex flex-col gap-2 p-4 overflow-y-auto'>
        {dashboardInfo.map(dashboard => (
          <li key={dashboard.id}>
            <DashboardCard
              title={dashboard.title}
              color={dashboard.color}
              createdByMe={dashboard.createdByMe}
              id={dashboard.id}
              selected={dashboard.id === Number(dashboardId)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;

export const reduceText = (text: string | undefined, length: number) => {
  if (!text) return;
  if (text.length > length) return `${text.slice(0, length)}...`;
  return text;
};

interface DashboardCardProps {
  id?: number;
  title?: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  createdByMe?: boolean;
  userId?: number;
  selected: boolean;
}

const DashboardCard = memo(({ title, color, createdByMe, id, selected = false }: DashboardCardProps) => {
  const reducedTitlePc = reduceText(title, 11);
  const reducedTitleTablet = reduceText(title, 4);

  return (
    <Link href={`/dashboard/${id}`}>
      <div
        className={`flex-center h-[40px] w-full rounded-sm tb:h-[45px] tb:justify-start ${
          selected ? 'bg-tp-violet_100' : 'hover:bg-gray-100'
        }`}
        aria-label={`Go to dashboard ${title}`}>
        <DashboardColorDot color={color} />
        <div className='hidden items-center pr-3 tb:flex'>
          <p className='break-keep px-2 text-tp-gray-900'>
            <span className='hidden pc:inline'>{reducedTitlePc}</span>
            <span className='pc:hidden'>{reducedTitleTablet}</span>
          </p>
          {createdByMe && <Image src={CrownIcon} width={18} height={28} alt='Crown icon' />}
        </div>
      </div>
    </Link>
  );
});

function DashboardColorDot({ color }: { color: string }) {
  return (
    <div className='flex p-4 tb:px-3 tb:py-0'>
      <div className='h-2 w-2 rounded-full' style={{ backgroundColor: color }}></div>
    </div>
  );
}
