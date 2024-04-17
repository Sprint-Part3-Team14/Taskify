import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NumberChip from '../../Chip/NumberChip';

import { I_DashboardTitle } from '@/interface/Dashboard';
import ELLIPSE from '@/public/icon/ellipse.svg';
import SETTING from '@/public/icon/setting.svg';

const DashboardTitle = ({ title, count }: I_DashboardTitle) => {
  const path = usePathname();
  const dashboardId = path.split('/')[2];

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={ELLIPSE} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{title}</div>
        <NumberChip count={count} />
      </div>
      <Link href={`/dashboard/${dashboardId}/edit`}>
        <Image src={SETTING} alt='setting' width={24} height={24} />
      </Link>
    </div>
  );
};

export default DashboardTitle;
