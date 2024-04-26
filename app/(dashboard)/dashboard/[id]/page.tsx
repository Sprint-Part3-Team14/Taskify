'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import AddButton from '@/components/common/button/add';
import Column from '@/components/Dashboard/Column/Column';
import CreateColumnModal from '@/components/Modal/CreateColumnModal';

import { useHandleModal } from '@/hooks/useHandleModal';
import { getColumnList } from '@/utils/api/getColumnList';

const Dashboard = () => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [columnList, setColumnList] = useState([]);

  const path = usePathname();
  const dashboardId = path.split('/')[2];
  const columntitle = columnList.map(column => column.title);

  useEffect(() => {
    const getDashboardColumnList = async () => {
      try {
        const { data } = await getColumnList({ id: dashboardId });
        setColumnList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getDashboardColumnList();
  }, []);

  return (
    <div className='flex mb:flex-col pc:flex-row pc:w-full bg-tp-gray_500'>
      <div className='flex justify-between'>
        <div className='flex pc:flex-row mb:flex-col w-full'>
          {columnList &&
            columnList.map(column => <Column key={column.id} columnItem={column} dashboardItem={columnList} />)}
        </div>
      </div>
      <div className='w-fit grow py-16 px-5 bg-tp-gray_500'>
        <AddButton onClick={handleToggleModal}>새로운 컬럼 추가하기</AddButton>
        {isShowModal && (
          <CreateColumnModal handleModal={handleToggleModal} dashboardId={dashboardId} columnTitle={columntitle} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
