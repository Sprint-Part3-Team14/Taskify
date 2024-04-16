import { I_TagChip } from '@/interface/Chip';

const TagChip = ({ size, name, color }: I_TagChip) => {
  const fontSizeSelect = {
    large: 'text-xs',
    small: 'text-[0.625rem]',
  };
  const randomColor = {
    blue: 'bg-[#DBE6F7] text-[#4981D5]',
    red: 'bg-[#F7DBF0] text-[#D549B6]',
    green: 'bg-[#E7F7DB] text-[#86D549]',
    brown: 'bg-[#F9EEE3]  text-[#D58D49]',
  };
  return (
    <div className={`${fontSizeSelect[size]} ${randomColor[color]} flex items-center  px-2 py-1 gap-1.5 rounded  `}>
      {name}
    </div>
  );
};
export default TagChip;
