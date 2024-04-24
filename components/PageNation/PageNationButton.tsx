import { ArrowBackwardIcon, ArrowForwardIcon } from 'constant/importImage';
import Image from 'next/image';
import { MouseEvent } from 'react';

interface PageNationButtonProps {
  currentPage: number;
  totalPage: number;
  handleCurrentPage: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PageNationButton = ({ currentPage, totalPage, handleCurrentPage }: PageNationButtonProps) => {
  return (
    <div className='flex items-center pc:gap-4 mb:gap-2.5 '>
      <p className='text-sm text-tp-black_700'>
        {totalPage} 페이지 중 {currentPage}
      </p>
      <div className='flex justyfy-center items-center'>
        <button
          id='previous'
          onClick={handleCurrentPage}
          type='button'
          className='border border-solid border-tp-gray_700 rounded-l-md active:bg-tp-gray_600 pc:p-3 mb:p-2.5'>
          <div className='w-4 h-4 relative'>
            <Image fill src={ArrowForwardIcon} alt='다음 페이지 보기' />
          </div>
        </button>
        <button
          id='next'
          onClick={handleCurrentPage}
          type='button'
          className='border border-solid border-tp-gray_700 rounded-r-md active:bg-tp-gray_600 pc:p-3 mb:p-2.5'>
          <div className='w-4 h-4 relative'>
            <Image fill src={ArrowBackwardIcon} alt='다음 페이지 보기' />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PageNationButton;
