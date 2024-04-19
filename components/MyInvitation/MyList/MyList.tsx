'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AddButton from 'components/common/button/add';
import MyPagination from '../MyPagenation';
import EditColumnModal from 'components/Modal/EditColumnModal';
import { I_MyDashboardList } from 'interface/myInvitation';

import { LINK_DASHBOARD_ARROW, MADE_BY_ME_CROWN } from '../constants';

const MyList = ({ myDashboards, totalCount }: I_MyDashboardList) => {
  const [isToggledModal, setIsToggledModal] = useState(false);

  let totalPage = Math.ceil(totalCount / 5);

  const handleToggledMdoal = () => {
    setIsToggledModal(!isToggledModal);
  };

  return (
    <div className='flex flex-col gap-1 max-w-[63.875rem]'>
      <div className='flex flex-wrap mb:justify-center pc:justify-start gap-3 tb:gap-[0.625rem] tb:flex-wrap'>
        <AddButton onClick={handleToggledMdoal}>새로운 대시보드</AddButton>
        {/* 모달 변경 */}
        {isToggledModal && <EditColumnModal handleModal={handleToggledMdoal} />}
        {myDashboards.map(({ title, color, userId, createdByMe }, index) => (
          <Link key={index} href={`dashboard/${userId}`}>
            <div className='flex justify-between items-center gap-2.5 px-5  min-w-[284px] tb:w-[544px] pc:w-[333px] h-[4.375rem] py-1 tb:py-2 rounded-md bg-tp-white border border-solid border-tp-gray_700'>
              <div className='flex items-center gap-4'>
                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6' fill={color}>
                    <circle cx='3' cy='3' r='3' fill={color} />
                  </svg>
                </div>
                <div className='text-lg font-bold '>{title}</div>
                {createdByMe && <Image src={MADE_BY_ME_CROWN} alt='byme' width={20} height={16} />}
              </div>
              <Image src={LINK_DASHBOARD_ARROW} alt='arrow' width={18} height={18} />
            </div>
          </Link>
        ))}
      </div>
      <div className='flex justify-end items-center w-full gap-4'>
        <div className='mb:text-xs tb:text-sm'>{totalPage} 페이지 중 1</div>
        <div className='flex'>
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default MyList;
