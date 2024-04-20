'use client';
import ChangePassword from '@/components/MyDashBoard Page/accountMenu/ChangePassword';
import EditProfile from '@/components/MyDashBoard Page/accountMenu/EditProfile';

const AccountMenu = () => {
  return (
    <div className='flex flex-col gap-5'>
      <EditProfile />
      <ChangePassword />
    </div>
  );
};

export default AccountMenu;
