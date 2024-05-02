import { ArrowBackwardIcon, ArrowForwardIcon } from 'constant/importImage';
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';

interface PageNationButtonProps {
  currentPage: number;
  totalPage: number;
  handleCurrentPage: (event: MouseEvent<HTMLButtonElement>) => void;
  hiddenCount?: boolean;
}

const PageNationButton = ({
  currentPage,
  totalPage,
  handleCurrentPage,
  hiddenCount = false,
}: PageNationButtonProps) => {
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setNext] = useState(false);
  const hasNextPage = () => {
    if (currentPage === totalPage) {
      setNext(true);
    } else {
      setNext(false);
    }
  };

  const hasPreviousPage = () => {
    if (currentPage === 1) {
      setHasPrevious(true);
    } else {
      setHasPrevious(false);
    }
  };

  useEffect(() => {
    hasNextPage();
    hasPreviousPage();
  }, [currentPage]);
  return (
    <div className='flex items-center pc:gap-4 mb:gap-2.5 '>
      {hiddenCount && (
        <p className='text-sm text-tp-black_700'>
          {totalPage} 페이지 중 {currentPage}
        </p>
      )}
      <div className='flex justyfy-center items-center'>
        <button
          id='previous'
          onClick={handleCurrentPage}
          type='button'
          className={`border border-solid border-tp-gray_700 rounded-l-md pc:p-3 mb:p-2.5 ${hasPrevious ? '' : 'active:bg-tp-gray_600'}`}>
          <div className={`w-4 h-4 relative ${hasPrevious ? 'opacity-30' : ''}`}>
            <Image fill src={ArrowForwardIcon} alt='다음 페이지 보기' />
          </div>
        </button>
        <button
          id='next'
          onClick={handleCurrentPage}
          type='button'
          className={`border border-solid border-tp-gray_700 rounded-r-md pc:p-3 mb:p-2.5 ${hasNext ? '' : 'active:bg-tp-gray_600'}`}>
          <div className={`w-4 h-4 relative  ${hasNext ? 'opacity-30' : ''}`}>
            <Image fill src={ArrowBackwardIcon} alt='다음 페이지 보기' />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PageNationButton;
