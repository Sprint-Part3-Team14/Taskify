'use client';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';

interface DataForm {
  data: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    createdByMe: boolean;
  };
}

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
  const selectColorList = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

  const handleSelectColor = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectColor(event.currentTarget.id);
  };

  return (
    <form
      role='table-Container'
      className='flex flex-col rounded-md bg-tp-white px-7 pt-8 pb-7 shadow-sm w-[38.75rem] gap-8'>
      <div role='header' className='flex justify-between'>
        <h1 className='text-[1.25rem] font-bold text-tp-black_700'>{mockData.title}</h1>
        <div className='flex items-center gap-2.5'>
          {selectColorList.map(color => {
            return (
              <button
                type='button'
                key={color}
                id={color}
                onClick={handleSelectColor}
                className='w-[1.875rem] h-[1.875rem] relative'>
                {selectColor === color && (
                  <div className='w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <Image fill src='/icon/white_check.svg' alt='선택된 색상' />
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
          className='p-4 w-[35.25rem] rounded-md border border-solid border-tp-gray_700'
          placeholder={mockData.title}
        />
      </div>
      <button type='submit' className='py-1.5 px-7 rounded-md bg-tp-violet_900 self-end text-white'>
        변경
      </button>
      {/** 버튼 컴포넌트로 변경 예정 */}
    </form>
  );
};

export default ChangeDashBoardName;
