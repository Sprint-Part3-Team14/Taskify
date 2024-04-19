'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import AddButton from 'components/common/button/add';
import MyPagination from '../MyPagenation';
import CreateDashboardModal from 'components/Modal/InviteModal';
import { I_MyDashboardList } from 'interface/myInvitation';

import { LINK_DASHBOARD_ARROW, MADE_BY_ME_CROWN } from '../constants';

const MyList = ({ myDashboards }: I_MyDashboardList) => {
  const [isToggledModal, setIsToggledModal] = useState(false);

  const handleToggledMdoal = () => {
    setIsToggledModal(!isToggledModal);
  };

  return (
    <div className='flex flex-col gap-1 max-w-[63.875rem]'>
      <div className='flex flex-wrap mb:justify-center pc:justify-start gap-3 tb:gap-[0.625rem] tb:flex-wrap'>
        <AddButton onClick={handleToggledMdoal}>새로운 대시보드</AddButton>
        {/* 모달 변경 */}
        {isToggledModal && <CreateDashboardModal handleModal={handleToggledMdoal} />}
        {myDashboards.map(({ title, color, userId, createdByMe }, index) => (
          <Link key={index} href={`dashboard/${userId}`}>
            <div className='flex justify-between items-center gap-2.5 px-5  min-w-[284px] tb:w-[544px] pc:w-[333px] h-[4.375rem] py-1 tb:py-2 rounded-md bg-tp-white border border-solid border-tp-gray_700'>
              <div className='flex gap-4'>
                <div className='w-2 h-2'>{color}</div> {/* 이미지 태그로 변경 */}
                <div className='text-lg font-bold '>{title}</div>
                {createdByMe && <Image src={MADE_BY_ME_CROWN} alt='byme' width={20} height={16} />}
              </div>
              <Image src={LINK_DASHBOARD_ARROW} alt='arrow' width={18} height={18} />
            </div>
          </Link>
        ))}
      </div>
      <div className='flex justify-end items-center w-full gap-4'>
        <div className='mb:text-xs tb:text-sm'>1 페이지 중 1</div>
        <div className='flex'>
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default MyList;
