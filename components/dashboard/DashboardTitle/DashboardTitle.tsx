import Image from 'next/image';

import NumberChip from './NumberChip'; //임시 컴포넌트

import SETTING from '@/public/icon/setting.svg';

const DashboardTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  w-36 text-lg font-bold'>
        <div>C</div>
        <div>{title}</div>
        <NumberChip count={3} />
      </div>
      <Image src={SETTING} alt='setting' width={24} height={24} />
    </div>
  );
};

export default DashboardTitle;
