import InviteSection from '@/components/my/InviteSection/InviteSection';
import MyList from '@/components/my/MyList/MyList';

const My = () => {
  const dashboardLists = [
    { title: '버튼 1', image: '1', id: 1 },
    { title: '버튼 2', image: '2', id: 5 },
    // { title: '버튼 3', image: '3', id: 4 },
    // { title: '버튼 4', image: '4', id: 3 },
    // { title: '버튼 5', image: '5', id: 2 },
  ];

  return (
    <section className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 mx-10 mt-10 '>
        <MyList dashboardList={dashboardLists} />
        <InviteSection />
      </div>
    </section>
  );
};

export default My;
