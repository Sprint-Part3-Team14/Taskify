import { PropsWithChildren } from 'react';

import Image from 'next/image';

import PLUS_VIOLET from '@/public/icon/plus_violet.svg';

const AddDashboardButton = ({ children }: PropsWithChildren) => {
  return (
    <button className='flex justify-center gap-2.5 text-lg font-bold w-[260px] tb:w-[247px] pc:w-[332px] py-5 tb:py-6 pc:py-7 rounded-md  border border-solid border-tp-gray_700'>
      {children}
      <div className='flex gap-3 items-center justify-center'>
        <p className='flex font-bold text-base tb:test-lg'>새로운 대시보드</p>
        <div className='flex items-center justify-center w-5 h-5 tb:w-6 tb:h-6 p-0.5 bg-tp-violet_100 rounded  '>
          <Image src={PLUS_VIOLET} alt='plus' width={18} height={18} />
        </div>
      </div>
    </button>
  );
};

export default AddDashboardButton;
