import '@/styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const DashboardLayoutProfile = ({ children }: PropsWithChildren) => {
  return (
    <section className='flex min-h-screen  '>
      <div className='flex min-h-full min-w-full w-full '>
        <div className='w-72 bg-slate-500'>사이드바 임시 공간...</div>
        <div className='w-full '>
          <div className=' h-20 bg-slate-400'>헤더 임시 공간 ...</div>
          <div className='p-5 bg-[#fafafa]'>
            <Link href='/boardid'>
              <button type='button' className='text-base text-tp-black_700 flex gap-1.5 items-center mb-6'>
                <div className='w-5 h-5 relative'>
                  <Image fill src='/icon/arrow_forward.svg' alt='뒤로 가기 버튼' />
                </div>
                돌아가기
              </button>
            </Link>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayoutProfile;
//  규헌님 레이아웃 가져다가 쓰겠습니다
