'use client';

import { CloseIcon, CrownIcon, EditIcon, PlusIcon } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo/logo_large.jpg';

interface Props {
  dashboardId?: string;
}

const SideMenu = ({ dashboardId }: Props) => {
  const dashboards = [
    { id: 1, name: '대시보드1', color: 'bg-pink-200' },
    { id: 2, name: '대시보드2', color: 'bg-blue-200' },
    { id: 3, name: '대시보드3', color: 'bg-green-200' },
  ];

  return (
    <div className='sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-300 flex flex-col'>
      <div className='flex items-center p-6'>
        <Image src={logo} width={110} height={34} alt='로고' />
      </div>
      <div className='flex items-center justify-between p-8 mt-12'>
        <p className='text-xs font-bold text-gray-700'>Dash Boards</p>
        <button onClick={() => console.log('Add Modal 연결')}>
          <Image src={PlusIcon} width={20} height={20} alt='대시보드 생성하기' />
        </button>
      </div>
      <ul className='flex flex-col gap-2 p-4 overflow-y-auto'>
        {dashboards.map(dashboard => (
          <li
            key={dashboard.id}
            className='flex items-center justify-between p-2 rounded-md bg-white text-gray-700 hover:bg-gray-200'>
            <Link href={`/dashboard/${dashboard.id}`}>
              <div className='flex items-center gap-2'>
                <span className={`w-2 h-2 rounded-full ${dashboard.color}`}></span>
                <span>{dashboard.name}</span>
              </div>
            </Link>
            <Image src={CrownIcon} width={20} height={20} alt='대시보드' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
