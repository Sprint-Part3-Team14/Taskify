import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MainLogo from '@/public/logo/large_icon_logo.png';

export interface SigninType {
  email: string;
  password: string;
}

const SigninPage = () => {
  return (
    <div className='h-screen bg-white'>
      <div className='mx-auto max-h-fit min-h-screen w-full max-w-lg flex-col px-12 py-16 text-center'>
        <Link className='mx-auto my-0 inline-block w-10/12 ' href={'/'}>
          <Image src={MainLogo} alt='메인 로고 이미지' width={120} />
        </Link>
        <h1 className='mt-10 text-lg font-medium'>오늘도 만나서 반가워요!</h1>
      </div>
    </div>
  );
};

export default SigninPage;
