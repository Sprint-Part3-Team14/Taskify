import Image from 'next/image';

import { I_ProgressChip } from '@/interface/Chip';
import ELLIPSE from '@/public/icon/ellipse.svg';

const ProgressChip = ({ size = 'large', title }: I_ProgressChip) => {
  const fontSizeSelect = {
    large: 'text-xs',
    small: 'text-[0.625rem]',
  };
  return (
    <div
      className={`${fontSizeSelect[size]} flex items-center  px-2 py-1 gap-1.5 rounded-xl bg-tp-violet_100 text-tp-violet_900`}>
      <Image src={ELLIPSE} alt='ellipse' width={6} height={6} />
      <div>{title}</div>
    </div>
  );
};

export default ProgressChip;
