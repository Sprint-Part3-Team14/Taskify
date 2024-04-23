import Image from 'next/image';

const PLUS_VIOLET = '/icon/plus_violet.svg';

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

const AddButton = ({ children, onClick }: Props) => {
  return (
    <button
      className='flex mb:justify-center items-center gap-2.5 text-lg font-bold mb:min-w-[284px] tb:min-w-0 w-full h-[4.375rem] py-1 tb:py-2 rounded-md bg-tp-white  border border-solid border-tp-gray_700'
      onClick={onClick}>
      {children}
      <div className='flex items-center justify-center w-5 h-5 tb:w-6 tb:h-6 p-0.5 bg-tp-violet_100 rounded  '>
        <Image src={PLUS_VIOLET} alt='plus' width={18} height={18} />
      </div>
    </button>
  );
};

export default AddButton;
