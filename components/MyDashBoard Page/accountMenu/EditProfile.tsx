'use client';
import InputImageFile from '@/components/InputImage/InputImage';
import { useInputValue } from '@/hooks/useInputValue';
import { changeUserProfile } from '@/utils/api/changeUserProfile';
import { getLoginUserProfile } from '@/utils/api/getLoginUserProfile';
import { FormEvent, useEffect, useState } from 'react';

const EditProfile = () => {
  const [imageURL, setImageURL] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    profileImageUrl: '',
  });
  const newNickName = useInputValue();

  const handleImageFile = (imageUrl: string) => {
    setImageURL(imageUrl);
  };

  const getUserData = async () => {
    const { email, nickname, profileImageUrl } = await getLoginUserProfile();
    setUserData({
      email: email,
      nickname: nickname,
      profileImageUrl: profileImageUrl,
    });
  };

  const changeProfile = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const newProfileData = {
      nickname: newNickName.inputValue,
      profileImageUrl: imageURL ? imageURL : userData.profileImageUrl,
    };

    try {
      await changeUserProfile({ newProfileData });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      role='edit-profile-container'
      className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-sm w-[38.75rem]'>
      <h2 className='text-2xl text-tp-black_700 font-bold mb-4'>프로필</h2>
      <form
        role='edit-profile'
        className='flex items-center justify-center gap-4 mb-12 relative'
        onSubmit={changeProfile}>
        <InputImageFile size='large' handleImageFile={handleImageFile} defaultImg={userData.profileImageUrl} />
        <div role='email-nickname-input-container' className='flex flex-col gap-3.5'>
          <div role='email-box' className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-lg text-tp-black_700'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              value={userData.email}
              disabled={true}
              className='p-2.5 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 text-tp-gray_700 disabled:bg-white'
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
              className='p-2.5 w-[22.875rem] rounded-md border border-solid border-tp-gray_700 outline-tp-violet_900 disabled:bg-white'
            />
          </div>
        </div>
        <button
          type='submit'
          onSubmit={changeProfile}
          className='absolute right-1 -bottom-[3.4375rem] py-2.5 px-8 border border-solid border-tp-gray_700 rounded-lg self-end bg-tp-violet_900 text-white active:bg-violet-900 mt-2.5'>
          저장
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
