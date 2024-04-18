import Image from 'next/image';

import Empty_Message from '@/public/icon/unsubscribe.svg';

const EmptyMessage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-6 py-32'>
      <Image src={Empty_Message} alt='none' width={100} height={100} />
      <p className='text-lg text-tp-gray_800'>아직 초대받은 대시보드가 없어요</p>
    </div>
  );
};

export default EmptyMessage;
