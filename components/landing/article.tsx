import Image from 'next/image';

import DashBoardImage from '@/public/image/landing1.jpg';

const MainSection = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex h-[42.875rem] w-11/12 min-w-fit max-w-7xl flex-col justify-center overflow-hidden rounded-md text-center tb:h-[60.75rem] tb:justify-start pc:grid pc:h-[37.5rem] pc:w-4/6 pc:grid-cols-2 pc:justify-items-center bg-violet-100'>
        <div className='mt-20 text-left'>
          <div className='text-18 text-gray-500 tb:text-[24px]'>Point1</div>
          <div className='mt-20 whitespace-nowrap text-[36px] font-bold tb:text-[48px]'>일의 우선순위를</div>
          <div className='mb-25 whitespace-nowrap text-[36px] font-bold tb:text-[48px]'>관리하세요</div>
        </div>
        <div className='rounded-md relative ml-auto mt-22 flex h-250 w-296 items-end tb:mt-120 tb:h-435 tb:w-[32.5rem] pc:mt-28 pc:h-500 pc:w-[37.125rem]'>
          <Image src={DashBoardImage} alt='Illustration' fill />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
