'use client';
import { FormEvent, useEffect, useState } from 'react';

import InputImageFile from '@/components/InputImage/InputImage';
import { useInputValue } from '@/hooks/useInputValue';
import { changeUserProfile } from '@/utils/api/changeUserProfile';
import { changeUserProfileImage } from '@/utils/api/changeUserProfileImage';
import { getLoginUserProfile } from '@/utils/api/getLoginUserProfile';

const EditProfile = () => {
  const [imageURL, setImageURL] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    profileImageUrl: '',
  });
  const newNickName = useInputValue();

  const getUserData = async () => {
    try {
      const { email, nickname, profileImageUrl } = await getLoginUserProfile();
      setUserData({
        email: email,
        nickname: nickname,
        profileImageUrl: profileImageUrl,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const changeProfile = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const newProfileData = {
      nickname: newNickName.inputValue,
      profileImageUrl: imageURL ? imageURL : userData.profileImageUrl,
    };

    try {
      await changeUserProfile({ newProfileData });
      alert('프로필이 저장되었습니다.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const inputImageCallBack = async ({ file }) => {
    const { profileImageUrl } = await changeUserProfileImage({ file });
    setImageURL(profileImageUrl);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      role='edit-profile-container'
      className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-sm pc:w-[38.75rem] tb:w-[34rem] mb:w-[17.75rem]'>
      <h2 className='pc:text-2xl tb:text-2xl mb:text-xl text-tp-black_700 font-bold mb-4'>프로필</h2>
      <form
        role='edit-profile'
        className='flex pc:flex-row tb:flex-row  mb:flex-col items-center justify-stretch gap-4 mb-12 relative'
        onSubmit={changeProfile}>
        <InputImageFile size='large' defaultImg={userData.profileImageUrl} apiCallback={inputImageCallBack} />
        <div
          role='email-nickname-input-container'
          className='flex flex-col gap-3.5 pc:w-[22.875rem] tb:w-[18.125rem] mb:w-[15.25rem]'>
          <div role='email-box' className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-lg text-tp-black_700'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              value={userData.email}
              disabled={true}
              className='p-2.5 rounded-md border border-solid border-tp-gray_700 text-tp-gray_700 disabled:bg-white'
            />
          </div>
          <div role='nickname-input-box' className='flex flex-col gap-2'>
            <label htmlFor='change-nickname' className='text-lg text-tp-black_700'>
              닉네임
            </label>
            <input
              type='text'
              id='change-nickname'
              placeholder={userData.nickname}
              onChange={newNickName.onChange}
              className='p-2.5 rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 disabled:bg-white'
            />
          </div>
        </div>
        <button
          type='submit'
          onSubmit={changeProfile}
          className='absolute right-1 -bottom-[3.4375rem] py-2.5 px-8 border border-solid border-tp-gray_700 rounded-lg self-end bg-tp-violet_900 text-white active:bg-violet-900'>
          저장
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
