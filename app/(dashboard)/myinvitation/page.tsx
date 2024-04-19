'use client';

import { useEffect, useState } from 'react';
import { setAccessToken, getAccessToken } from '@/utils/handleToken';

import InvitationSection from '@/components/MyInvitation/InvitationSection/InvitationSection';
import MyList from '@/components/MyInvitation/MyList/MyList';

const MyInvitation = () => {
  const [myDashboardList, setMyDashboardList] = useState([]);
  const [myDashboardCount, setMyDashboradCount] = useState(0);

  useEffect(() => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUyNTU1MywiaXNzIjoic3AtdGFza2lmeSJ9.2kheeUfADWooyZ3NbAjEXFC950TeM3zRlamHVMACSto'
    );
    const myDashboardData = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(
          'https://sp-taskify-api.vercel.app/4-14/dashboards?navigationMethod=pagination&page=1&size=5',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        const myDashboardListData = responseData.dashboards;
        setMyDashboardList(myDashboardListData);
        setMyDashboradCount(responseData.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    myDashboardData();
  }, []);

  return (
    <section className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 mx-10 mt-10 '>
        <MyList myDashboards={myDashboardList} totalCount={myDashboardCount} />
        <InvitationSection />
      </div>
    </section>
  );
};

export default MyInvitation;
