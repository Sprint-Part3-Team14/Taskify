import Image from 'next/image';

import logo from '../../public/logo/logo_large.jpg';

const Header = () => {
  return (
    <>
      <div className='z-nav flex h-70 w-full items-center justify-between bg-white pr-20 tb:h-70 tb:pl-16 tb:pr-40 pc:pr-80'>
        <div className='p-4'>
          <Image src={logo} alt='Logo' width={121} height={39} />
        </div>
        <div className='flex gap-9 tb:gap-36'>
          <button className='button body1-normal hover:body1-bold text-gray-7'>로그인</button>
          <button className='button body1-normal hover:body1-bold text-gray-7'>회원가입</button>
        </div>
      </div>
    </>
  );
};

export default Header;
