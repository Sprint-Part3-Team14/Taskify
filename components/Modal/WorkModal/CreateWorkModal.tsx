import { ChangeEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import PersonInChargeDropDown from './components/PersonInChargeDropDown';
import ProgressDropDown from './components/ProgressDropDown';
import InputImageFile from '@/components/InputImage/InputImage';

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
        <InputImageFile size='small' />
      </form>
    </ModalLayout>
  );
};

export default CreateWorkModal;
