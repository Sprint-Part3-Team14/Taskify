import InvitationSection from '@/components/MyInvitation/InvitationSection/InvitationSection';
import MyList from '@/components/MyInvitation/MyList/MyList';

import { TEMPORARY_MY_DASHBOARD_DATA } from '@/components/MyInvitation/constants';

const MyInvitation = () => {
  return (
    <section className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 mx-10 mt-10 '>
        <MyList myDashboards={TEMPORARY_MY_DASHBOARD_DATA} />
        <InvitationSection />
      </div>
    </section>
  );
};

export default MyInvitation;
