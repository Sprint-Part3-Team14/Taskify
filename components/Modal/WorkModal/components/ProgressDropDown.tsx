'use client';
import ProgressChip from 'components/common/Chip/ProgressChip';
import { ArrowDropDownIcon, CheckIcon } from 'constant/importImage';
import Image from 'next/image';
import { useState } from 'react';


import { I_Column, I_Dashboard } from '@/interface/Dashboard';

interface I_ProgressDropDown {
  columnItem: I_Column;
  dashboardItem: I_Dashboard[];
}

const ProgressDropDown = ({ columnItem, dashboardItem }: I_ProgressDropDown) => {
  const [openList, setOpenList] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<I_Column>(columnItem);
  const [selectItem, setSelectItem] = useState(<ProgressChip size='large' title={dashboardItem[0].title} />);

  function handleOpenDropDown() {
    openList ? setOpenList(false) : setOpenList(true);
  }

  function handleSelectItem(item) {
    setSelectedColumn(item);
    setSelectItem(<ProgressChip size='large' title={item.title} />);
  }

  return (
    <div className='relative '>
      <h3 className='text-lg mb-2.5 font-extrabold'>상태</h3>
      <button
        onClick={handleOpenDropDown}
        type='button'
        className={
          openList
            ? 'tb:w-[13.6rem] mb:w-[12rem] border border-solid border-tp-violet_900 inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
            : 'w-[13.6rem] mb:w-[12rem] border border-solid  inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
        }>
        {selectItem}
        <div className='w-6 h-6 relative'>
          <Image fill src={ArrowDropDownIcon} alt='상태 선택' />
        </div>
      </button>
      {openList && (
        <div className='absolute left-0 z-10 mt-1 mb:w-[12rem] tb:w-[13.6rem]  bg-white shadow-lg ring-1 ring-black ring-opacity-5 last:rounded-b-md'>
          {dashboardItem.map(item => (
            <div
              className='flex gap-1.5 px-4 py-2 text-sm hover:bg-slate-50'
              key={item.id}
              id={String(item.id)}
              onClick={() => handleSelectItem(item)}>
              <div className={selectedColumn.title === item.title ? 'w-5 h-5 relative' : 'w-5 h-5 relative invisible'}>
                <Image fill src={CheckIcon} alt='선택된 상태' />
              </div>
              <ProgressChip size='large' title={item.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressDropDown;
