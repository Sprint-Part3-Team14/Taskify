import { PropsWithChildren } from 'react';

import Image from 'next/image';

import PLUS_VIOLET from '@/public/icon/plus_violet.svg';

const AddColumnButton = ({ children }: PropsWithChildren) => {
  return (
    <button className='flex justify-center gap-2.5 text-lg font-bold w-[284px] tb:w-[544px] pc:w-[354px] py-5 tb:py-6 rounded-md  border border-solid border-tp-gray_700'>
      {children}
      <div className='flex gap-3 items-center justify-center'>
        <p className='flex font-bold text-base tb:test-lg'>새로운 컬럼 추가하기</p>
        <div className='flex items-center justify-center w-5 h-5  tb:w-6 tb:h-6 p-0.5 bg-tp-violet_100 rounded  '>
          <Image src={PLUS_VIOLET} alt='plus' width={18} height={18} />
        </div>
      </div>
    </button>
  );
};

export default AddColumnButton;
