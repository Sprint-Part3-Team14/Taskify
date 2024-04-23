'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

import AddButton from 'components/common/button/add';

import CreateDashboardModal from 'components/Modal/CreateDashboardModal';
import { getAccessToken } from 'utils/handleToken';
import { I_MyDashboardList } from 'interface/myInvitation';

import { INITIAL_COLOR, LINK_DASHBOARD_ARROW, MADE_BY_ME_CROWN, BUTTON_TITLE } from '../constants';
import MyPagination from '../MyPagenation'; // 공통

const MyList = ({ myDashboards, totalCount, onClickNextPage, onClickPrevPage, currentPage }: I_MyDashboardList) => {
  const [isToggledModal, setIsToggledModal] = useState(false);
  const [newDashboardTitle, setNewDashBoardTitle] = useState('');
  const [selectColor, setSelectColor] = useState(INITIAL_COLOR);

  const route = useRouter();

  let totalPage = Math.ceil(totalCount / 5);

  const handleToggledModal = () => {
    setIsToggledModal(!isToggledModal);
  };

  const handleDashboardNewTitle = (title: string) => {
    setNewDashBoardTitle(title);
  };

  const handleSelectColor = (color: string) => {
    setSelectColor(color);
  };

  const handleCreateDashboard = async () => {
    if (!newDashboardTitle.trim()) {
      alert('대시보드 제목을 입력하세요.');
      return;
    }

    try {
      const accessToken = getAccessToken();
      const response = await fetch('https://sp-taskify-api.vercel.app/4-14/dashboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: newDashboardTitle,
          color: selectColor.toString(),
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        const newDashboardId = responseData.id;
        setNewDashBoardTitle('');
        setSelectColor(INITIAL_COLOR);
        route.push(`/dashboard/${newDashboardId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='flex flex-col gap-1 max-w-[63.875rem]'>
      <div className='grid pc:grid-cols-3 tb:grid-cols-2 mb:grid-cols-1 gap-[0.625rem] pc:h-[9.5rem]  '>
        <AddButton onClick={handleToggledModal}>{BUTTON_TITLE.ADD_DASHBOARD}</AddButton>
        {isToggledModal && (
          <CreateDashboardModal
            handleModal={handleToggledModal}
            onClickFirstButton={handleToggledModal}
            onClickSecondButton={handleCreateDashboard}
            onSelectColor={handleSelectColor}
            onChange={handleDashboardNewTitle}
          />
        )}
        {myDashboards.map(({ title, color, id, createdByMe }, index) => (
          <Link className='w-full ' key={index} href={`dashboard/${id}`}>
            <div className='flex justify-between items-center gap-2.5 px-5 w-full  tb:min-w-0  h-[4.375rem] py-1 tb:py-2 rounded-md bg-tp-white border border-solid border-tp-gray_700 hover:bg-tp-gray_500 hover:border-tp-gray_800'>
              <div className='flex items-center gap-4'>
                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' width='6' height='6' viewBox='0 0 6 6' fill={color}>
                    <circle cx='3' cy='3' r='3' fill={color} />
                  </svg>
                </div>
                <div className='w-full  flex gap-3 overflow-hidden text-ellipsis whitespace-nowrap'>
                  <div className='w-full  text-lg font-bold overflow-hidden text-ellipsis'>{title}</div>
                  {createdByMe && <Image src={MADE_BY_ME_CROWN} alt='byme' width={20} height={16} />}
                </div>
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
            leftDisabled={currentPage === 1}
          />
        </div>
      </div>
    </section>
  );
};

export default MyList;
