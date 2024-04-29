import { EllipseIcon } from 'constant/importImage';
import Image from 'next/image';


interface I_ProgressChip {
  title: string;
  size?: 'large' | 'small';
}

const fontSizeSelect = {
  large: 'text-xs',
  small: 'text-[0.625rem]',
};

const ProgressChip = ({ size = 'large', title }: I_ProgressChip) => {
  return (
    <div
      className={`${fontSizeSelect[size]} flex  items-center  px-2 py-1 gap-1.5 rounded-xl bg-tp-violet_100 text-tp-violet_900`}>
      <Image src={EllipseIcon} alt='ellipse' width={6} height={6} />
      <div>{title}</div>
    </div>
  );
};

export default ProgressChip;
