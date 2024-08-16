import '@/styles/globals.css';
import { NotFound, RightArrow } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='fixed h-screen w-screen bg-tp-violet_900'>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center tb:flex-row'>
        <div className='w-[18rem] h-[18rem] tb:w-[25rem] tb:h-[25rem] pc:w-[18rem] pc:h-[18rem] opacity-5 pc:opacity-100 absolute pc:relative -top-40 -left-10 tb:-top-[10rem] tb:-left-[8rem] pc:top-0 pc:left-0 -z-10'>
          <Image fill src={NotFound} alt='page search icon' />
        </div>
        <div className='flex flex-col text-right tb:items-end items-center -mt-20 pc:-ml-8'>
          <h1 className='text-white tb:text-[10rem] text-[8rem] font-black pc:text-[8rem]'>404</h1>
          <p className='text-white text-[1.5rem] pc:text-xl -mt-8'>Page Not Found</p>
          <div className='hidden tb:flex items-center gap-2.5 pc:mt-1'>
            <div className='relative w-5 h-5'>
              <Image fill src={RightArrow} alt='link to main icon' />
            </div>
            <Link href='/'>
              <p className='text-white text-lg pc:text-sm cursor-pointer hover:underline underline-offset-8'>
                메인으로 가기
              </p>
            </Link>
          </div>
          <Link href='/'>
            <button
              type='button'
              className='rounded-md mt-2.5 px-7 py-2 border border-solid bg-white border-white text-tp-violet_900 font-black text-sm active:bg-tp-violet_100 tb:hidden'>
              메인으로 가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
