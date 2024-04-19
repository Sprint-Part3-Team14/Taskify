'use client';
import InputImageFile from '@/components/InputImage/InputImage';
import { changeUserProfileImage } from '@/utils/api/changeUserProfileImage';
import { useState } from 'react';

const EditProfile = () => {
  const [imageFile, setImageFile] = useState();

  const handleImageFile = imageFormData => {
    setImageFile(imageFormData);
  };

  return (
    <div
      role='edit-profile-container'
      className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-sm w-[38.75rem]'>
      <h2 className='text-2xl text-tp-black_700 font-bold mb-8'>프로필</h2>
      <form role='edit-profile' className='flex items-center gap-4'>
        <InputImageFile size='large' handleImageFile={handleImageFile} />
        <div role='email-nickname-input-container' className='flex flex-col gap-5'>
          <div role='email-box' className='flex flex-col gap-2.5'>
            <label htmlFor='email' className='text-lg text-tp-black_700'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              placeholder='sksms2104@naver.com'
              disabled={true}
              className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 disabled:bg-white'
            />
          </div>
          <div role='nickname-input-box' className='flex flex-col gap-2.5'>
            <label htmlFor='change-nickname' className='text-lg text-tp-black_700'>
              닉네임
            </label>
            <input
              type='text'
              id='change-nickname'
              placeholder='김유경'
              className='p-4 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 disabled:bg-white'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
