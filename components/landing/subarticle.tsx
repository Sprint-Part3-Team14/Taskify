import { LANDINGIMAGE2 } from 'constant/importImage';
import Image from 'next/image';

const SubArticle = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex h-[42.875rem] w-11/12 min-w-fit max-w-7xl flex-col justify-center overflow-hidden rounded-md text-center tb:h-[60.75rem] tb:justify-start pc:grid pc:h-[37.5rem] pc:w-4/6 pc:grid-cols-2 pc:justify-items-center bg-violet-100'>
        <div className='flex-center pc:h-[38.75rem] pc:w-[37.125rem]'>
          <div className='relative mt-22 flex h-250 w-217 tb:mt-120 tb:h-415 tb:w-360 pc:h-[31.25rem] pc:w-436 pc:mt-[6.25rem] pc:ml-[5rem] pc:mr-[4rem]'>
            <Image src={LANDINGIMAGE2} alt='Illustration' fill />
          </div>
        </div>
        <div className='mt-20 text-left'>
          <div className='text-18 text-gray-500 tb:text-[24px]'>Point2</div>
          <div className='mt-20 whitespace-nowrap text-[36px] font-bold tb:text-[48px]'>해야 할 일을</div>
          <div className='mb-25 whitespace-nowrap text-[36px] font-bold tb:text-[48px]'>등록하세요</div>
        </div>
      </div>
    </div>
  );
};

export default SubArticle;
