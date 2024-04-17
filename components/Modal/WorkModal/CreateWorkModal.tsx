import { ChangeEvent, useState } from 'react';
import InputImageButton from '../Button/InputImageButton';
import ModalDropdown from '../Input/ModalDropdown';
import ModalLayout from '../ModalLayout';
import PersonInChargeDropDown from './components/PersonInChargeDropDown';
import ProgressDropDown from './components/ProgressDropDown';
import Image from 'next/image';

const CreateWorkModal = ({ handleModal }: { handleModal: () => void }) => {
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
    <ModalLayout handleModal={handleModal} title='할 일 생성'>
      <form>
        <div className='flex gap-4 h-[6.25rem]'>
          <ProgressDropDown />
          <PersonInChargeDropDown />
        </div>
        <div className='flex flex-col gap-2.5 h-[7.5rem]'>
          <label className='flex gap-1 font-extrabold text-lg'>
            제목<span className='text-tp-violet_900 '>*</span>
          </label>
          <input
            type='text'
            placeholder='제목을 입력해 주세요'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 placeholder:text-sm'
          />
        </div>
        <div className='flex flex-col gap-2.5 h-[9rem]'>
          <label className='flex gap-1 font-extrabold text-lg'>
            설명<span className='text-tp-violet_900 '>*</span>
          </label>
          <div className='relative inline'>
            <textarea
              id='Comments'
              placeholder='설명을 입력해 주세요'
              className='text-sm w-[28.125rem] h-[6rem] border border-solid border-tp-gray_700 rounded-lg pt-4 px-4 pb-11 outline-tp-violet_900 relative placeholder:text-sm'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2.5 h-[7.5rem]'>
          <label className='flex gap-1 font-extrabold text-lg '>마감일</label>
          <input
            type='date'
            date-placeholder='날짜를 입력해 주세요'
            required
            aria-required='true'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 before:content-[attr(data-placeholder) w-full]'
          />
        </div>
        <div className='flex flex-col gap-2.5 h-[8rem]'>
          <label className='flex gap-1 font-extrabold text-lg'>태그</label>
          <input
            type='text'
            placeholder='입력 후 Enter'
            className='border border-solid border-tp-gray_700 p-4 rounded-lg outline-tp-violet_900 placeholder:text-sm'
          />
        </div>
        <div className='flex flex-col gap-2.5 '>
          <label htmlFor='image-upload' className='flex flex-col gap-2.5 font-extrabold text-lg'>
            <p className='flex gap-1 font-extrabold text-lg'>이미지</p>
            {!selectImage ? (
              <div className='bg-[#f5f5f5] rounded-md flex justify-center items-center p-6 w-[4.75rem] h-[4.75rem]'>
                <div className='relative w-7 h-7'>
                  <Image fill src='/icon/violet_plus.svg' alt='이미지 추가하기' id='input-image' />
                </div>
              </div>
            ) : (
              <>
                <div className='relative w-[4.75rem] h-[4.75rem] rounded-md overflow-hidden'>
                  <div className='w-[1.4375rem] h-[1.4375rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
                    <Image fill src='/icon/edit.svg' alt='이미지 변경하기' />
                  </div>
                  <div className='bg-tp-black_900 w-[4.75rem] h-[4.75rem] absolute z-10 opacity-40' />
                  <Image fill src={selectImage} alt='이미지 추가하기' />
                </div>
              </>
            )}
          </label>
          <input type='file' id='image-upload' accept='image/*' className='hidden' onChange={handleImageChange} />
        </div>
      </form>
    </ModalLayout>
  );
};

export default CreateWorkModal;
