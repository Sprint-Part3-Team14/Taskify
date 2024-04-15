import Image from 'next/image';
import { StaticImageData } from 'next/image';

import CALENDER from '@/public/icon/calendar_today.svg';

interface Props {
  image?: StaticImageData;
  alt?: string;
  title: string;
  tag: React.ReactNode[];
  date: string;
  user: JSX.Element;
}

const Card = ({ image, alt = '', title, tag, date, user }: Props) => {
  return (
    <div className='flex flex-col gap-2.5 p-5 w-96 border border-solid border-tp-gray_700 rounded-md'>
      {image && <Image className='w-full rounded-md' src={image} alt={alt} width={270} height={160} />}
      <div className=' font-semibold text-base'>{title}</div>
      <div className='flex gap-1.5'>
        {tag.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center gap-1.5'>
          <Image src={CALENDER} alt='calender' width={18} height={18} />
          <div className='text-xs font-medium text-tp-gray_900'>{date}</div>
        </div>
        <div>{user}</div>
      </div>
    </div>
  );
};

export default Card;
