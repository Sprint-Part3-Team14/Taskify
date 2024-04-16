import Image from 'next/image';

import logo from '../../public/logo/logo_large.jpg';

const Header = () => {
  return (
    <div className='z-nav flex h-70 w-full items-center justify-between bg-white pr-20 '>
      <div className='p-4'>
        <Image src={logo} alt='Logo' width={121} height={39} />
      </div>
      <div className='flex gap-5 tb:gap-9'>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </div>
  );
};

export default Header;
