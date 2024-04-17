'use client';

import { useState, useEffect } from 'react';

import AddButton from '../AddButton/AddButton';
import DashboardTitle from '../DashboardTitle/DashboardTitle';
import TempCard from '../TempCard';

import Card from '@/components/Card/Card';
import { I_Card } from '@/interface/Card';
import { I_CardList } from '@/interface/Dashboard';

const DashboardList = ({ cardDatas, title }: I_CardList) => {
  const [newCard, setNewCard] = useState<I_Card[]>([]);
  const [newCardList, setnewCardList] = useState<I_Card[]>([]);

  useEffect(() => {
    const addCard = [...(cardDatas || []), ...newCard];
    setnewCardList(addCard);
  }, [newCard, cardDatas]);

  const handleNewCard = (addCard: I_Card[]) => {
    setNewCard(prevNewCard => [...prevNewCard, ...addCard]);
  };

  console.log(newCard);

  return (
    <div className='flex flex-col border border-r-[1px] border-dotted  gap-4 w-96  min-h-screen p-5 '>
      <DashboardTitle title={title} count={cardDatas?.length || 0} />
      <AddButton />
      <TempCard onChange={handleNewCard} />
      {newCardList?.map(({ title, image, tag, date, user }, index) => (
        <Card key={index} title={title} image={image} alt={title} tag={tag} date={date} user={user} />
      ))}
    </div>
  );
};

export default DashboardList;
