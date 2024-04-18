import Image from 'next/image';

import MyList from '@/components/mydashboard/MyList/MyList';
import SEARCH_ICON from '@/public/icon/search.svg';

const Mydashboard = () => {
  return (
    <div className=' flex flex-col w-[1024px] gap-11 px-10 pt-10 '>
      <MyList />
      <div className='flex flex-col gap-6 w-full px-7 py-8'>
        <div className='text-2xl font-bold'>초대 받은 대시보드</div>
        <div className='flex w-full px-4 py-2 gap-2 border border-solid rounded-md border-tp-gray_700'>
          <Image src={SEARCH_ICON} alt='search' width={24} height={24} />
          <input className='w-full text-base placeholder:text-tp-gray_800' placeholder='검색' />
        </div>
      </div>
    </div>
  );
};

export default Mydashboard;
