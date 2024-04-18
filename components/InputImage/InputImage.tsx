import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type Size = 'small' | 'large';

const InputImageFile = ({ size }: { size: Size }) => {
  // const InputSize = size=== 'small' ? width : '4.75rem', height: '4.75rem' : width : '11.375rem', height : '11.375rem';
  const [selectImage, setSelectImage] = useState('');
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='flex flex-col gap-2.5 '>
      <p className='flex gap-1 font-extrabold text-lg'>이미지</p>
      <label htmlFor='image-upload' className='flex flex-col gap-2.5 font-extrabold text-lg'>
        {!selectImage ? (
          <div
            className={
              size === 'small'
                ? 'bg-[#f5f5f5] rounded-md flex justify-center items-center p-6 w-[4.75rem] h-[4.75rem]'
                : 'bg-[#f5f5f5] rounded-md flex justify-center items-center p-6 w-[11.375rem] h-[11.375rem]'
            }>
            <div className='relative w-7 h-7'>
              <Image fill src='/icon/violet_plus.svg' alt='이미지 추가하기' id='input-image' />
            </div>
          </div>
        ) : (
          <>
            <div
              className={
                size === 'small'
                  ? 'relative w-[4.75rem] h-[4.75rem] rounded-md overflow-hidden'
                  : 'relative w-[11.375rem] h-[11.375rem] rounded-md overflow-hidden'
              }>
              <div
                className={
                  size === 'small'
                    ? 'w-[1.4375rem] h-[1.4375rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'
                    : 'w-[1.875rem] h-[1.875rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'
                }>
                <Image fill src='/icon/edit.svg' alt='이미지 변경하기' />
              </div>
              <div
                className={
                  size === 'small'
                    ? 'bg-tp-black_900 w-[4.75rem] h-[4.75rem] absolute z-10 opacity-40'
                    : 'bg-tp-black_900 w-[11.375rem] h-[11.375rem] absolute z-10 opacity-40'
                }
              />
              <Image fill src={selectImage} alt='이미지 추가하기' />
            </div>
          </>
        )}
      </label>
      <input type='file' id='image-upload' accept='image/*' className='hidden' onChange={handleImageChange} />
    </div>
  );
};

export default InputImageFile;
