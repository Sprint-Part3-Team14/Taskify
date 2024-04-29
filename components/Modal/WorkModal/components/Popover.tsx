import { DeleteIcon, SettingIcon } from 'constant/importImage';
import Image from 'next/image';

interface I_Popover {
  editCard: () => void;
  deleteCard: () => void;
}

const Popover = ({ editCard, deleteCard }: I_Popover) => {
  return (
    <div className='absolute right-[80px] top-[-10px]  w-[14rem] flex text-center items-center justify-center  h-[3rem] border rounded-md border-solid '>
      <button
        type='button'
        onClick={editCard}
        className='flex items-center justify-center bg-tp-violet_100 text-tp-violet_900 w-full h-full gap-3'>
        <Image src={SettingIcon} alt='setting' width={15} height={15} />
        <div>수정하기</div>
      </button>
      <button
        type='button'
        onClick={deleteCard}
        className='flex items-center justify-center bg-tp-gray_500 w-full h-full gap-3'>
        <Image src={DeleteIcon} alt='setting' width={15} height={15} />
        <div>삭제하기</div>
      </button>
    </div>
  );
};

export default Popover;
