import Image from 'next/image';

const InputImageButton = ({ size }: { size: 'small' | 'large' }) => {
  return (
    <div
      className={
        size === 'small'
          ? 'bg-[#f5f5f5] rounded-md flex justify-center items-center p-6 w-[4.75rem] h-[4.75rem]'
          : 'bg-[#f5f5f5] rounded-md flex justify-center items-center p-6 w-[11.375rem] h-[11.375rem]'
      }>
      <div className={size === 'small' ? 'relative w-7 h-7' : 'relative w-[1.875rem] h-[1.875rem]'}>
        <Image fill src='/icon/violet_plus.svg' alt='이미지 추가하기' />
      </div>
    </div>
  );
};

export default InputImageButton;
