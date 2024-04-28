'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import AddButton from '@/components/common/button/add';
import CreateDashboardModal from '@/components/Modal/CreateDashboardModal';
import PageNationButton from '@/components/PageNation/PageNationButton';

import { getMyDashboardList } from '@/utils/api/getMyDashboardList';
import { createDashborad } from '@/utils/api/createDashboard';

import { usePageNation } from '@/hooks/usePageNation';
import { useHandleModal } from '@/hooks/useHandleModal';

import { ArrowBackwardIcon, CrownIcon } from 'constant/importImage';
import { INITIAL_COLOR, BUTTON_TITLE, MESSAGE } from '../constants';

const MyList = () => {
  const [newDashboardTitle, setNewDashBoardTitle] = useState('');
  const [selectColor, setSelectColor] = useState(INITIAL_COLOR);

  const { isShowModal, handleToggleModal } = useHandleModal();
  const { pageNation, setPageNation, handleCurrentPage } = usePageNation();
  const [myDashboardList, setMyDashboardList] = useState([]);

  const route = useRouter();
  const apiQuery = {
    showCount: 5,
  };

  const handleGetMyDashboardList = async () => {
    try {
      const { dashboards, totalCount } = await getMyDashboardList({
        currentPage: pageNation.currentPage,
        showCount: apiQuery.showCount,
      });
      setPageNation(prevState => ({
        ...prevState,
        totalPage: Math.ceil(totalCount / apiQuery.showCount),
      }));
      setMyDashboardList(dashboards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateDashboard = async () => {
    if (!newDashboardTitle.trim()) {
      alert(MESSAGE.NO_DASHBOARD_TITLE);
      return;
    }

    try {
      const { id } = await createDashborad({
        title: newDashboardTitle,
        color: selectColor.toString(),
      });
      const newDashboardId = id;
      setNewDashBoardTitle('');
      setSelectColor(INITIAL_COLOR);
      route.push(`/dashboard/${newDashboardId}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetMyDashboardList();
  }, [pageNation.currentPage]);

  const handleDashboardNewTitle = (title: string) => {
    setNewDashBoardTitle(title);
  };

  const handleSelectColor = (color: string) => {
    setSelectColor(color);
  };

  return (
    <section className='flex flex-col gap-1 max-w-[63.875rem]'>
      <div className='grid pc:grid-cols-3 tb:grid-cols-2 mb:grid-cols-1 gap-[0.625rem] pc:h-[9.5rem]  '>
        <AddButton onClick={handleToggleModal}>{BUTTON_TITLE.ADD_DASHBOARD}</AddButton>
        {isShowModal && (
          <CreateDashboardModal
            handleModal={handleToggleModal}
            onClickFirstButton={handleToggleModal}
            onClickSecondButton={handleCreateDashboard}
            onSelectColor={handleSelectColor}
            onChange={handleDashboardNewTitle}
          />
        )}
        {myDashboardList &&
          myDashboardList.map(({ title, color, id, createdByMe }, index) => (
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
                    {createdByMe && <Image src={CrownIcon} alt='byme' width={20} height={16} />}
                  </div>
                </div>
                <Image src={ArrowBackwardIcon} alt='arrow' width={18} height={18} />
              </div>
            </Link>
          ))}
      </div>
      <div className='flex justify-end items-center w-full gap-4'>
        <div className='flex'>
          <PageNationButton
            totalPage={pageNation.totalPage}
            currentPage={pageNation.currentPage}
            handleCurrentPage={handleCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default MyList;
