'use client';

import { FormEvent, useEffect, useState } from 'react';

import InputImageFile from '@/components/InputImage/InputImage';
import Toast from '@/components/common/Toast/Toast';
import SingleButton from '@/components/common/button/SingleButton';
import { useInputValue } from '@/hooks/useInputValue';
import { useHandleToast } from '@/hooks/usehandleToast';
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
  const { isShowToast, handleToggleToast, setIsShowToast, handleToastType, type, handleToastMessage, message } =
    useHandleToast();

  const getUserData = async () => {
    try {
      const { email, nickname, profileImageUrl } = await getLoginUserProfile();
      setUserData({
        email: email,
        nickname: nickname,
        profileImageUrl: profileImageUrl,
      });
    } catch (error: any) {
      alert(error.message);
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
      handleToastType('complete');
      handleToastMessage('프로필이 저장되었습니다.');
      handleToggleToast();
      getUserData();
    } catch (error: any) {
      handleToastType('error');
      handleToastMessage(error.message);
      handleToggleToast();
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
    <>
      {isShowToast && (
        <Toast
          type={type}
          handleToast={handleToggleToast}
          message={message}
          isToast={isShowToast}
          setShowToast={setIsShowToast}
        />
      )}
      <div className='flex flex-col pt-8 px-7 pb-7 bg-white rounded-lg shadow-sm pc:w-[38.75rem] tb:w-[34rem] '>
        <h2 className='pc:text-2xl tb:text-2xl text-tp-black_700 font-bold mb-4'>프로필</h2>
        <form
          role='edit-profile'
          className='flex pc:flex-row tb:flex-row items-center justify-stretch gap-4 mb-12 relative'
          onSubmit={changeProfile}>
          <InputImageFile size='large' defaultImg={userData.profileImageUrl} apiCallback={inputImageCallBack} />
          <div
            role='email-nickname-input-container'
            className='flex flex-col gap-3.5 pc:w-[22.875rem] tb:w-[18.125rem]'>
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
          <div className='absolute -bottom-[3.5rem] right-0'>
            <SingleButton type='submit' colorType='violet' onSubmit={changeProfile}>
              저장
            </SingleButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
