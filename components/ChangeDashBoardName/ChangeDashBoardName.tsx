'use client';
import { useInputValue } from '@/hooks/useInputValue';
import { changeDashBoard } from '@/utils/api/changeDashBoard';
import { getDashBoardData } from '@/utils/api/getDashBoardData';
import { WhiteCheckIcon } from 'constant/importImage';
import Image from 'next/image';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';

const mockData = {
  id: 5946,
  title: '유갱갱',
  color: '#FFA500',
  createdAt: '2024-04-17T10:43:33.309Z',
  updatedAt: '2024-04-18T13:57:48.950Z',
  userId: 1680,
  createdByMe: true,
};
// mock 데이터

const ChangeDashBoardName = () => {
  const [selectColor, setSelectColor] = useState('#7AC555');
  const [changeDashBoardData, setChangeDashBoardData] = useState({
    title: '',
    color: '',
  });
  const [oldDashBoardName, setOldDashBoardName] = useState('');
  const newDashBoardName = useInputValue();
  const selectColorList = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

  const handleSelectColor = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectColor(event.currentTarget.id);
  };

  const handleLoadDashBoard = async dashBoardId => {
    try {
      const { title } = await getDashBoardData(dashBoardId);
      setOldDashBoardName(title);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChangeDashBoard = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    setChangeDashBoardData({
      title: newDashBoardName.inputValue,
      color: selectColor,
    });
    try {
      const result = changeDashBoard({ dashBoardId: 5946, changeData: changeDashBoardData });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLoadDashBoard(5946);
  }, []);

  return (
    <form
      onSubmit={handleChangeDashBoard}
      role='table-Container'
      className='flex flex-col rounded-md bg-tp-white px-7 pt-8 pb-7 shadow-sm gap-8 pc:w-[38.75rem] tb:w-[34rem] mb:w-[17.75rem]'>
      <div role='header' className='flex justify-between'>
        <h1 className='text-[1.25rem] font-bold text-tp-black_700 '>{oldDashBoardName}</h1>
        <div className='flex items-center gap-2.5 '>
          {selectColorList.map(color => {
            return (
              <button
                type='button'
                key={color}
                id={color}
                onClick={handleSelectColor}
                className='pc:w-[1.875rem] pc:h-[1.875rem] mb:w-7 mb:h-7 pc:block tb:block mb:hidden mb:first:block relative'>
                {selectColor === color && (
                  <div className='w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <Image fill src={WhiteCheckIcon} alt='선택된 색상' />
                  </div>
                )}
                <div className='min-w-full min-h-full rounded-full' style={{ backgroundColor: color }} />
              </button>
            );
          })}
        </div>
      </div>
      <div role='change-title-container' className='flex flex-col gap-2.5'>
        <label htmlFor='change-dashboard-title' className='text-lg text-tp-black_700'>
          대시보드 이름
        </label>
        <input
          id='change-dashboard-title'
          type='text'
          className='rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 p-3'
          placeholder={oldDashBoardName}
          onChange={newDashBoardName.onChange}
          value={newDashBoardName.inputValue}
        />
      </div>
      <button
        type='submit'
        onSubmit={handleChangeDashBoard}
        className='py-1.5 px-7 rounded-md bg-tp-violet_900 self-end text-white'>
        변경
      </button>
    </form>
  );
};

export default ChangeDashBoardName;
