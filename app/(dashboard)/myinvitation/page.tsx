'use client';

import { useEffect, useState } from 'react';
import InvitationSection from 'components/MyInvitation/InvitationSection/InvitationSection';
import MyList from 'components/MyInvitation/MyList/MyList';
import { getAccessToken } from 'utils/handleToken';

const MyInvitation = () => {
  const [myDashboardList, setMyDashboardList] = useState([]);
  const [myDashboardCount, setMyDashboradCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    const getMyDashboardList = async () => {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(
          `https://sp-taskify-api.vercel.app/4-14/dashboards?navigationMethod=pagination&page=${currentPage}&size=${PAGE_SIZE}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        const myDashboardList = responseData.dashboards;
        setMyDashboardList(myDashboardList);
        setMyDashboradCount(responseData.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    getMyDashboardList();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <main className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 px-10 pt-10 '>
        <MyList
          myDashboards={myDashboardList}
          totalCount={myDashboardCount}
          onClickNextPage={handleNextPage}
          onClickPrevPage={handlePrevPage}
          currentPage={currentPage}
        />
        <InvitationSection />
      </div>
    </main>
  );
};

export default MyInvitation;
