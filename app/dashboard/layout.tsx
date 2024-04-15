import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className='flex min-h-screen  '>
      <div className='flex min-h-full min-w-full w-full '>
        <div className='w-72 bg-slate-500'>사이드바 임시 공간...</div>
        <div className='w-full '>
          <div className=' h-20 bg-slate-400'>헤더 임시 공간 ...</div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
