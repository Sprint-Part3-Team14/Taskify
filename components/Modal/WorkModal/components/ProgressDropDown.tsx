'use client';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';

const list = ['To Do', 'On Progress', 'Done'];

const ProgressDropDown = () => {
  const [openList, setOpenList] = useState(false);
  const [selectItem, setSelectItem] = useState('To Do');

  function handleOpenDropDown() {
    openList ? setOpenList(false) : setOpenList(true);
  }

  function handleSelectItem(event: MouseEvent<HTMLElement>) {
    setSelectItem(event.currentTarget.id);
  }

  return (
    <div className='relative'>
      <h3 className='text-lg mb-2.5 font-extrabold'>상태</h3>
      <button
        onClick={handleOpenDropDown}
        type='button'
        className={
          openList
            ? 'w-[13.6rem] border border-solid border-tp-violet_900 inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
            : 'w-[13.6rem] border border-solid  inline-flex justify-between rounded-md bg-white px-3 py-2 hover:bg-gray-50 '
        }>
        {/** <ProgressChip size="large" title={selectItem} />*/}
        {selectItem}
        <div className='w-6 h-6 relative'>
          <Image fill src='/icon/arrow_drop_down.svg' alt='상태 선택' />
        </div>
      </button>
      {openList && (
        <div className='absolute left-0 z-10 mt-1 w-[13.6rem] bg-white shadow-lg ring-1 ring-black ring-opacity-5 last:rounded-b-md'>
          {list.map(item => (
            <div
              className='flex gap-1.5 px-4 py-2 text-sm hover:bg-slate-50'
              key={item}
              id={item}
              onClick={handleSelectItem}>
              <div className={selectItem === item ? 'w-5 h-5 relative' : 'w-5 h-5 relative invisible'}>
                <Image fill src='/icon/check.svg' alt='선택된 상태' />
              </div>
              {item} {/**progressChip 생기면 지워도 됨 */}
              {/* <ProgressChip size="large" title={item}> */}
            </div>
            // map 도는 컴포넌트를 prop으로 받을까..? 데이터랑 컴포넌트를 받으면 될 듯
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressDropDown;
