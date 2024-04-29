import Link from 'next/link';

import Members from './members';
import ProfilePopup from './profilePopup';

const ProfileInfo = () => {
  const loginInfo = {
    id: 1,
    nickname: '홍길동',
    profileImageUrl: '',
  };
  const myProfile = {
    id: loginInfo.id ?? 1,
    nickname: loginInfo.nickname ?? '홍길동',
    profileImageUrl: loginInfo.profileImageUrl ?? 'https://unsplash.com/photos/a_specific_photo_id',
  };

  return (
    <div className='justify-center items-center group relative gap-3'>
      <Link href='/myinvitation' className='flex justify-center items-center gap-3'>
        <Members members={[myProfile]} totalCount={1} />
        <div className='block text-base font-medium tablet:block'>{myProfile.nickname}</div>
      </Link>
      <ProfilePopup />
    </div>
  );
};

export default ProfileInfo;
