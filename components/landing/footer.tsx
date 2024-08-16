import Image from 'next/image';

import EmailIcon from '@/public/images/icon/email.svg';
import FaceBookIcon from '@/public/images/icon/facebook_icon.svg';
import InstargramIcon from '@/public/images/icon/instagram_icon.svg';

const Footer = () => {
  return (
    <>
      <div className='flex-center flex w-full max-w-[120rem] text-18 items-center justify-between px-10 pt-40'>
        <div>@codeit - 2023</div>
        <div className='flex h-14 w-117 justify-between gap-5 whitespace-nowrap'>
          <a className='flex items-center' href=''>
            Privacy Policy
          </a>
          <a className='flex items-center' href=''>
            FAQ
          </a>
        </div>
        <div className='flex gap-5'>
          <button className='h-18 w-18 tablet:h-22 tablet:w-22'>
            <Image src={EmailIcon} alt='이메일 아이콘' height={18} width={18} />
          </button>

          <button className='h-18 w-18 tablet:h-22 tablet:w-22'>
            <Image src={FaceBookIcon} alt='페이스북 아이콘' height={18} width={18} />
          </button>
          <button className='h-18 w-18 tablet:h-22 tablet:w-22'>
            <Image src={InstargramIcon} alt='인스타그램 아이콘' height={18} width={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
