'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

import AddButton from 'components/common/button/add';
import MyPagination from '../MyPagenation';
import CreateDashboardModal from 'components/Modal/CreateDashboardModal';
import { I_MyDashboardList } from 'interface/myInvitation';
import { getAccessToken, setAccessToken } from '@/utils/handleToken';

import { LINK_DASHBOARD_ARROW, MADE_BY_ME_CROWN } from '../constants';

const MyList = ({ myDashboards, totalCount, onClickNextPage, onClickPrevPage, currentPage }: I_MyDashboardList) => {
  const [isToggledModal, setIsToggledModal] = useState(false);
  const [createDashboardTitle, setCraeteDashboardTitle] = useState<string>('');
  const [selectColor, setSelectColor] = useState('');
  const route = useRouter();

  let totalPage = Math.ceil(totalCount / 5);

  const handleToggledMdoal = () => {
    setIsToggledModal(!isToggledModal);
  };

  const handleClosedModal = () => {
    handleToggledMdoal();
  };

  const handleDashbaordTItle = (title: string) => {
    setCraeteDashboardTitle(title);
  };

  const handleSelectColor = (color: string) => {
    setSelectColor(color);
  };

  console.log(createDashboardTitle);
  console.log(selectColor);

  const handleCreateDashboard = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    try {
      const accessToken = getAccessToken();
      const response = await fetch('https://sp-taskify-api.vercel.app/4-14/dashboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: createDashboardTitle,
          color: selectColor.toString(),
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        const createdDashboardId = responseData.id;
        setCraeteDashboardTitle('');
        setSelectColor('#7AC555');
        route.push(`/dashboard/${createdDashboardId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-1 max-w-[63.875rem]'>
      <div className='flex flex-wrap mb:justify-center pc:justify-start gap-3 tb:gap-[0.625rem] tb:flex-wrap'>
        <AddButton onClick={handleToggledMdoal}>새로운 대시보드</AddButton>
        {isToggledModal && (
          <CreateDashboardModal
            handleModal={handleToggledMdoal}
            onClickFirstButton={handleClosedModal}
            onClickSecondButton={handleCreateDashboard}
            onSelectColor={handleSelectColor}
            onChange={handleDashbaordTItle}
          />
        )}
        {myDashboards.map(({ title, color, id, createdByMe }, index) => (
          <Link key={index} href={`dashboard/${id}`}>
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
        <div className='mb:text-xs tb:text-sm'>
          {totalPage} 페이지 중 {currentPage}
        </div>
        <div className='flex'>
          <MyPagination
            onLeftClick={onClickPrevPage}
            onRightClick={onClickNextPage}
            rightDisabled={totalPage <= currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MyList;
