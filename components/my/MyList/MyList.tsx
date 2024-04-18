'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AddButton from '@/components/common/button/add';
import Pagination from '@/components/common/button/pagenation';
import EditColumnModal from '@/components/Modal/EditColumnModal';

const ARROW = '/icon/arrow_backward.svg';

interface DashboardItem {
  title: string;
  image: string;
  id: number;
}

interface Props {
  dashboardList: DashboardItem[];
}

const MyList = ({ dashboardList }: Props) => {
  const [isToggledModal, setIsToggledModal] = useState(false);

  const handleToggledMdoal = () => {
    setIsToggledModal(!isToggledModal);
  };

  return (
    <div className='flex flex-col gap-1 max-w-[63.875rem]  '>
      <div className='flex flex-wrap mb:justify-center pc:justify-start gap-3 tb:gap-[0.625rem] tb:flex-wrap'>
        <AddButton onClick={handleToggledMdoal}>새로운 대시보드</AddButton>
        {/* 모달 변경 */}
        {isToggledModal && <EditColumnModal handleModal={handleToggledMdoal} />}
        {dashboardList.map(({ title, image, id }, index) => (
          <Link key={index} href={`dashboard/${id}`}>
            <div className='flex justify-between items-center gap-2.5 px-5  min-w-[284px] tb:w-[544px] pc:w-[333px] h-[4.375rem] py-1 tb:py-2 rounded-md bg-tp-white border border-solid border-tp-gray_700'>
              <div className='flex gap-4'>
                <div className='w-2 h-2'>{image}</div>
                <div className='text-lg font-bold '>{title}</div>
              </div>
              <Image src={ARROW} alt='arrow' width={18} height={18} />
            </div>
          </Link>
        ))}
      </div>
      <div className='flex justify-end items-center w-full gap-4'>
        <div className='mb:text-xs tb:text-sm'>1 페이지 중 1</div>
        <div className='flex'>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default MyList;
