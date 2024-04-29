import { DESKTOPIMAGE } from 'constant/importImage';
import Image from 'next/image';
import Link from 'next/link';

const MainSection = () => {
  return (
    <div className='flex-center mb-100 flex-col tb:justify-center mb-24'>
      <div className='flex justify-center items-center'>
        <Image src={DESKTOPIMAGE} alt='Illustration' width={722} height={422.761} />
      </div>
      <div className='flex flex-center pt-12 mt-50 flex-col text-[40px] tb:flex-row tb:justify-center tb:text-[42px] pc:text-[50px]'>
        <div className='text-center font-bold tb:mr-6'>새로운 일정 관리</div>
        <div className='font-["Montserrat"] font-bold text-purple first-letter:text-center'>Taskify</div>
      </div>
      <div className='my-10 whitespace-break-spaces text-center text-24 font-bold tb:text-[32px] tb:flex-center'>
        <div className='hidden tb:block'>효율적인 일정 관리와 협업을 위한 완벽한 툴</div>
        <div className='block tb:hidden'>
          효율적인 일정 관리와
          <br />
          협업을 위한 완벽한 툴
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='py-4 px-6 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700'>
          <Link href='/signin'>{'   로그인 하기  '}</Link>
        </button>
      </div>
    </div>
  );
};

export default MainSection;
