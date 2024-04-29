import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { removeAccessToken } from '@/utils/handleToken';

const ProfilePopup = () => {
  const router = useRouter();
  const goMyPage = () => {
    router.push('/account-menu');
  };

  const logout = () => {
    removeAccessToken();
    router.push('/signin');
  };

  return (
    <div className='absolute -right-3 top-6 hidden bg-transparent pt-5 group-hover:block'>
      <div className='flex h-[100px] w-[130px] flex-col justify-center overflow-hidden rounded-md bg-tp-white shadow-tp-black_800'>
        <ProfilePopupButton onClick={goMyPage}>마이 페이지</ProfilePopupButton>
        <ProfilePopupButton onClick={logout}>로그아웃</ProfilePopupButton>
      </div>
    </div>
  );
};

interface ProfilePopupButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const ProfilePopupButton = ({ onClick, children }: ProfilePopupButtonProps) => {
  return (
    <button
      className='justify-center items-center text-base font-semibold h-[50px] w-full hover:bg-tp-violet_100 hover:text-tp-violet_900'
      onClick={onClick}>
      {children}
    </button>
  );
};

export default ProfilePopup;
