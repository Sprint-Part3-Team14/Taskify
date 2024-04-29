'use client';
import { WhiteCheckIcon } from 'constant/importImage';
import Image from 'next/image';
import { FormEvent, MouseEvent, useState } from 'react';

import SingleButton from '../common/button/SingleButton';

import { COLOR_LIST } from './constant';

import { useEffectOnce } from '@/hooks/useEffectOnce';
import { useInputValue } from '@/hooks/useInputValue';
import { changeDashBoard } from '@/utils/api/changeDashBoard';
import { getDashBoardData } from '@/utils/api/getDashBoardData';


const ChangeDashBoardName = ({ dashboardId }: { dashboardId: number }) => {
  const [selectColor, setSelectColor] = useState('#7AC555');
  const [beforeDashboardName, setBeforeDashboardName] = useState('');
  const newDashBoardName = useInputValue();

  const handleSelectColor = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectColor(event.currentTarget.id);
  };

  const handleLoadDashBoard = async dashBoardId => {
    try {
      const { title } = await getDashBoardData(dashBoardId);
      setBeforeDashboardName(title);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleChangeDashBoard = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    const newDashBoardData = {
      title: newDashBoardName.inputValue,
      color: selectColor,
    };

    try {
      await changeDashBoard({ dashBoardId: dashboardId, changeData: newDashBoardData });
      alert('대시보드 정보가 저장되었습니다.');
    } catch (error: any) {
      alert(error);
    }
  };

  useEffectOnce(() => handleLoadDashBoard(dashboardId));

  return (
    <form
      onSubmit={handleChangeDashBoard}
      role='table-Container'
      className='flex flex-col rounded-md bg-tp-white px-7 pt-8 pb-7 shadow-sm gap-8 pc:w-[38.75rem] tb:w-[33rem] w-[19rem]'>
      <div role='header' className='flex justify-between'>
        <h1 className='text-[1.25rem] font-bold text-tp-black_700 whitespace-nowrap text-ellipsis overflow-hidden pc:w-[22rem] tb:w-[18rem] w-[11rem]'>
          {beforeDashboardName}
        </h1>
        <div className='flex items-center gap-2.5 '>
          {COLOR_LIST.map(color => {
            return (
              <button
                type='button'
                key={color}
                id={color}
                onClick={handleSelectColor}
                className='pc:w-[1.875rem] pc:h-[1.875rem] w-7 h-7 pc:block tb:block hidden first:block relative'>
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
          placeholder={beforeDashboardName}
          onChange={newDashBoardName.onChange}
          value={newDashBoardName.inputValue}
        />
      </div>
      <SingleButton type='submit' onSubmit={handleChangeDashBoard} colorType='violet'>
        변경
      </SingleButton>
    </form>
  );
};

export default ChangeDashBoardName;
