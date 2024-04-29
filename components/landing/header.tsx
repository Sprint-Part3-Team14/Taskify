import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/images/logo/logo_large.jpg';

const Header = () => {
  return (
    <div className='z-nav flex h-70 w-full items-center justify-between bg-white px-12 '>
      <div className='p-4'>
        <Image src={logo} alt='Logo' width={121} height={39} />
      </div>
      <div className='flex gap-5 tb:gap-9'>
        <Link href='/signin'>
          <button>로그인</button>
        </Link>
        <Link href='/signup'>
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
