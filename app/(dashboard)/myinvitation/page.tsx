import InvitationSection from 'components/MyInvitation/InvitationSection/InvitationSection';
import MyList from 'components/MyInvitation/MyList/MyList';

const MyInvitation = () => {
  return (
    <main className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 px-10 pt-10 '>
        <MyList />
        <InvitationSection />
      </div>
    </main>
  );
};

export default MyInvitation;
