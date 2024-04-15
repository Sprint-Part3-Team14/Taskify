import { PropsWithChildren } from 'react';

import Image from 'next/image';

import PLUS_BLUE from '@/public/icon/plus_blue.svg';

const AddButton = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex justify-center gap-2.5 text-lg font-bold w-[341px] py-3 rounded-md  border border-solid border-tp-gray_700'>
      {children}
      <button className='flex items-center justify-center w-6 h-6 p-0.5 bg-tp-violet_100 rounded  '>
        <Image src={PLUS_BLUE} alt='plus' width={16} height={16} />
      </button>
    </div>
  );
};

export default AddButton;
