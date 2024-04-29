import Image from 'next/image';

import PLUS_VIOLET from '@/public/images/icon/violet_plus.svg';

interface I_ADD_BUTTON {
  children?: React.ReactNode;
  onClick: () => void;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

const AddButton = ({ children, onClick, id, type = 'button' }: I_ADD_BUTTON) => {
  return (
    <button
      id={id}
      type={type}
      className='flex mb:justify-center items-center gap-2.5 text-lg font-bold  tb:min-w-0 w-full h-[4.375rem] py-1 tb:py-2 rounded-md bg-tp-white  border border-solid border-tp-gray_700 hover:bg-tp-gray_500 hover:border-tp-gray_800'
      onClick={onClick}>
      {children}
      <div className='flex items-center justify-center w-5 h-5 tb:w-6 tb:h-6 p-0.5 bg-tp-violet_100 rounded'>
        <Image src={PLUS_VIOLET} alt='plus' width={18} height={18} />
      </div>
    </button>
  );
};

export default AddButton;
