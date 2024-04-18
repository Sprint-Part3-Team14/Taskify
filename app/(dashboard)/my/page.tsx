import InviteSection from '@/components/my/InviteSection/InviteSection';
import MyList from '@/components/my/MyList/MyList';

const My = () => {
  return (
    <div className='w-full h-full bg-tp-gray_500'>
      <div className=' flex flex-col  gap-11 mx-10 mt-10 '>
        <MyList />
        <InviteSection />
      </div>
    </div>
  );
};

export default My;
