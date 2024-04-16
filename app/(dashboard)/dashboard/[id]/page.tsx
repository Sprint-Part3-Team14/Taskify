'use client';

import { useState } from 'react';

import { LIST } from './mock';

import AddButton from '@/components/dashboard/AddButton/AddButton';
import DashboardList from '@/components/dashboard/DashboardList/DashboardList';
import TempMdoal from '@/components/dashboard/TempModal';

const Dashboard = () => {
  let tableTitle = '';
  const [cardlists, setCardlists] = useState(LIST);

  const handleTableTitle = (value: string) => {
    tableTitle = value;
  };

  const handleNewTable = () => {
    setCardlists(prevCardlists => [
      ...prevCardlists,
      {
        title: tableTitle,
        cards: [],
      },
    ]);
  };

  return (
    <div className='flex '>
      {cardlists.map(({ title, cards }, index) => (
        <DashboardList key={index} title={title} cardDatas={cards} />
      ))}
      <div className='w-fit grow py-16 px-5'>
        <AddButton>새로운 컬럼 추가하기</AddButton>
        <TempMdoal onChange={handleTableTitle} onClick={handleNewTable} />
      </div>
    </div>
  );
};

export default Dashboard;
