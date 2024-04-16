'use client';

import { useState } from 'react';

import { LIST } from './mock';

import NumberChip from '@/components/Chip/NumberChip';
import TagChip from '@/components/Chip/TagChip';
import AddButton from '@/components/dashboard/AddButton/AddButton';
import DashboardList from '@/components/dashboard/DashboardList/DashboardList';
import TempMdoal from '@/components/dashboard/TempModal';
import TEMP from '@/public/image/desktop.jpg'; //임시 이미지

const Dashboard = () => {
  const [listTitle, setListTitle] = useState('');
  const [cardlists, setCardlists] = useState(LIST);

  const handleListTitle = (value: string) => {
    setListTitle(value);
    listTitle;
  };

  const handleAddList = () => {
    setCardlists(prevCardlists => [
      ...prevCardlists,
      {
        title: listTitle,
        cards: [],
      },
    ]);
  };

  return (
    <div className='flex '>
      {cardlists.map(({ title, cards }, index) => (
        <DashboardList key={index} title={title} cardDatas={cards || null} />
      ))}
      <div className='w-fit grow py-16 px-5'>
        <AddButton>새로운 컬럼 추가하기</AddButton>
        <TempMdoal onChange={handleListTitle} onClick={handleAddList} />
      </div>
    </div>
  );
};

export default Dashboard;
