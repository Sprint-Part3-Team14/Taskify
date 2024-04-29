'use client';

import { CrownIcon, PlusIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, memo } from 'react';

import CreateDashboardModal from '@/components/Modal/CreateDashboardModal';
import logo from '@/public/images/logo/logo_large.jpg';
import { getMyDashboardList } from '@/utils/api/getMyDashboardList';
import PageNationButton from '@/components/PageNation/PageNationButton';
import { usePageNation } from '@/hooks/usePageNation';
import { createDashborad } from '@/utils/api/createDashboard';
import { useHandleModal } from '@/hooks/useHandleModal';

interface Props {
  dashboardId?: number;
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
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [dashboardTitle, setDashboardTitle] = useState('');
  const [dashboardColor, setDashboardColor] = useState('');
  const { pageNation, setPageNation, handleCurrentPage } = usePageNation();

  const handleTitleChange = title => {
    setDashboardTitle(title);
  };

  const handleColorSelect = color => {
    setDashboardColor(color);
  };

  const handleCreateDashborad = async () => {
    const requestBody = {
      title: dashboardTitle,
      color: dashboardColor,
    };

    try {
      await createDashborad(requestBody);
      handleToggleModal();
    } catch (error: any) {
      console.error('Error creating dashboard:', error);
      alert('Failed to create dashboard.');
    }
  };

  const handleLoadDashboardList = async () => {
    try {
      const { dashboards, totalCount } = await getMyDashboardList({
        currentPage: pageNation.currentPage,
        showCount: 10,
      });
      setDashboardInfo(dashboards);
      setPageNation(prev => ({
        ...prev,
        totalPage: Math.ceil(totalCount / 10),
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadDashboardList();
  }, [pageNation.currentPage]);

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
        <button aria-label='Add new dashboard' onClick={handleToggleModal}>
          <Image src={PlusIcon} width={20} height={20} alt='Add new dashboard' />
        </button>
      </div>
      {isShowModal && (
        <CreateDashboardModal
          handleModal={handleToggleModal}
          onChange={handleTitleChange}
          onSelectColor={handleColorSelect}
          onClickFirstButton={handleToggleModal}
          onClickSecondButton={handleCreateDashborad}
        />
      )}
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
      <div className='absolute bottom-2.5 left-2.5'>
        <PageNationButton
          hiddenCount={true}
          totalPage={pageNation.totalPage}
          currentPage={pageNation.currentPage}
          handleCurrentPage={handleCurrentPage}
        />
      </div>
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
        className={`flex items-center h-[40px] w-full rounded-sm tb:h-[45px] tb:justify-start ${
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
