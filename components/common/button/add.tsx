import { PropsWithChildren } from 'react';

import Image from 'next/image';

import PLUS_VIOLET from '@/public/icon/plus_violet.svg';

const AddButton = ({ children }: PropsWithChildren) => {
  return (
    <button className='flex justify-center gap-2.5 text-lg font-bold w-[284px] tb:w-[544px] pc:w-[341px] py-1 tb:py-2 rounded-md  border border-solid border-tp-gray_700'>
      {children}
      <div className='flex items-center justify-center w-5 h-5 tb:w-6 tb:h-6 p-0.5 bg-tp-violet_100 rounded  '>
        <Image src={PLUS_VIOLET} alt='plus' width={18} height={18} />
      </div>
    </button>
  );
};

export default AddButton;
