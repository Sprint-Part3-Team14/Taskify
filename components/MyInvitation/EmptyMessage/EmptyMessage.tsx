import { UnsubscribeIcon } from 'constant/importImage';
import Image from 'next/image';


const EmptyMessage = ({ message }: { message: string }) => {
  return (
    <section className='flex flex-col justify-center items-center mb:gap-4 tb:gap-6 pt-[9rem] mb:mb-[10rem] pc:mb-[13rem] '>
      <Image
        className='mb:w-[3.75rem] mb:h-[3.75rem] tb:w-[6.25rem] tb:h-[6.25rem] '
        src={UnsubscribeIcon}
        alt='none'
        width={100}
        height={100}
        priority
      />
      <p className='mb:text-sm tb:text-lg text-tp-gray_800'>{message}</p>
    </section>
  );
};

export default EmptyMessage;
