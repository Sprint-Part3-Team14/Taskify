import Image from 'next/image';

const EMPTY_MESSAGE = '/icon/unsubscribe.svg';

const EmptyMessage = () => {
  return (
    <div className='flex flex-col justify-center items-center mb:gap-4 tb:gap-6 pt-[9rem] mb:mb-[10rem] pc:mb-[13rem] '>
      <Image
        className='mb:w-[3.75rem] mb:h-[3.75rem] tb:w-[6.25rem] tb:h-[6.25rem] '
        src={EMPTY_MESSAGE}
        alt='none'
        width={100}
        height={100}
      />
      <p className='mb:text-sm tb:text-lg text-tp-gray_800'>아직 초대받은 대시보드가 없어요</p>
    </div>
  );
};

export default EmptyMessage;
