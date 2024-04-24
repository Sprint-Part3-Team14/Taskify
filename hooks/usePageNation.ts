import { MouseEvent, useState } from 'react';

export const usePageNation = () => {
  const [pageNation, setPageNation] = useState({
    currentPage: 1,
    totalPage: 1,
  });

  const handleCurrentPage = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.id === 'next') {
      if (pageNation.currentPage < pageNation.totalPage) {
        setPageNation(prevState => ({
          ...prevState,
          currentPage: pageNation.currentPage++,
        }));
      }
    } else {
      if (pageNation.currentPage > 1) {
        setPageNation(prevState => ({
          ...prevState,
          currentPage: pageNation.currentPage--,
        }));
      }
    }
  };
  return { pageNation, setPageNation, handleCurrentPage };
};
