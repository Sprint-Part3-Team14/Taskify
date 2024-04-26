'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import AddButton from '@/components/common/button/add';
import Column from '@/components/Dashboard/Column/Column';
import CreateColumnModal from '@/components/Modal/CreateColumnModal';

import { useHandleModal } from '@/hooks/useHandleModal';
import { getColumnList } from '@/utils/api/getColumnList';
import { createColumn } from '@/utils/api/createColumn';

const Dashboard = () => {
  const { isShowModal, handleToggleModal } = useHandleModal();
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [columnList, setColumnList] = useState([]);

  const path = usePathname();
  const dashboardId = path.split('/')[2];
  const columnTitle = columnList.map(column => column.title);

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

  const handleCreateColumn = async () => {
    if (newColumnTitle.trim() === '') {
      alert('제목을 입력해주세요');
      return;
    }

    if (columnTitle.includes(newColumnTitle)) {
      alert('중복된 컬럼이 존재합니다.');
      return;
    }

    try {
      const {} = await createColumn({ title: newColumnTitle, dashboardId: Number(dashboardId) });
      handleToggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewColumn = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setNewColumnTitle(title);
  };

  return (
    <div className='flex mb:flex-col pc:flex-row pc:w-full bg-tp-gray_500'>
      <div className='flex justify-between'>
        <div className='flex pc:flex-row mb:flex-col w-full'>
          {columnList &&
            columnList.map(column => <Column key={column.id} columnItem={column} dashboardItem={columnList} />)}
        </div>
      </div>
      <div className='min-w-[20rem] grow py-16 px-5 bg-tp-gray_500'>
        <AddButton onClick={handleToggleModal}>새로운 컬럼 추가하기</AddButton>
        {isShowModal && (
          <CreateColumnModal
            handleModal={handleToggleModal}
            onChange={handleNewColumn}
            onClickSecondButton={handleCreateColumn}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
