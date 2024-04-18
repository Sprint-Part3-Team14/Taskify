import InviteSection from '@/components/mydashboard/InviteSection/InviteSection';
import MyList from '@/components/mydashboard/MyList/MyList';

const Mydashboard = () => {
  return (
    <div className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col w-[1200px] gap-11 px-10 pt-10 '>
        <MyList />
        <InviteSection />
      </div>
    </div>
  );
};

export default Mydashboard;
