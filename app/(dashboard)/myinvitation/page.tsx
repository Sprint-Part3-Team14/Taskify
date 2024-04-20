'use client';

import { useEffect, useState } from 'react';
import InvitationSection from 'components/MyInvitation/InvitationSection/InvitationSection';
import MyList from 'components/MyInvitation/MyList/MyList';
import { setAccessToken, getAccessToken } from 'utils/handleToken';

const MyInvitation = () => {
  const [myDashboardList, setMyDashboardList] = useState([]);
  const [myDashboardCount, setMyDashboradCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    const myDashboardData = async () => {
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
        const myDashboardListData = responseData.dashboards;
        setMyDashboardList(myDashboardListData);
        setMyDashboradCount(responseData.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    myDashboardData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <section className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 mx-10 mt-10 '>
        <MyList
          myDashboards={myDashboardList}
          totalCount={myDashboardCount}
          onClickNextPage={handleNextPage}
          onClickPrevPage={handlePrevPage}
          currentPage={currentPage}
        />
        <InvitationSection />
      </div>
    </section>
  );
};

export default MyInvitation;
