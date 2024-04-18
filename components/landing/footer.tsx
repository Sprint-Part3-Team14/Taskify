import EmailIcon from '../../public/icon/email.svg';
import FaceBookIcon from '../../public/icon/facebook_icon.svg';
import InstargramIcon from '../../public/icon/instagram_icon.svg';

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
          <img src={EmailIcon} />
          <button className='h-18 w-18 tablet:h-22 tablet:w-22'>
            <img src={FaceBookIcon} />
          </button>
          <button className='h-18 w-18 tablet:h-22 tablet:w-22'>
            <img src={InstargramIcon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
