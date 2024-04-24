'use client';
import Image from 'next/image';
import { useState } from 'react';
import ProgressChip from 'components/common/Chip/ProgressChip';
import { I_ColumnList, I_DragDropItem } from '@/interface/Dashboard';
import { ArrowDropDownIcon, CheckIcon } from 'constant/importImage';

interface Props {
  dragDropItem: I_DragDropItem;
  column: I_ColumnList;
}

const ProgressDropDown = ({ dragDropItem, column }: Props) => {
  const columnList = Object.values(dragDropItem.columns);
  const [openList, setOpenList] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(column);
  const [selectItem, setSelectItem] = useState(<ProgressChip size='large' title={column.title} />);

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
            ? 'w-[13.6rem] border border-solid border-tp-violet_900 inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
            : 'w-[13.6rem] border border-solid  inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
        }>
        {selectItem}
        <div className='w-6 h-6 relative'>
          <Image fill src={ArrowDropDownIcon} alt='상태 선택' />
        </div>
      </button>
      {openList && (
        <div className='absolute left-0 z-10 mt-1 w-[13.6rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 last:rounded-b-md'>
          {columnList.map(item => (
            <div
              className='flex gap-1.5 px-4 py-2 text-sm hover:bg-slate-50'
              key={item.id}
              id={item.id}
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
