import { useState } from 'react';

export const useHandleModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleToggleModal = () => {
    isShowModal ? setIsShowModal(false) : setIsShowModal(true);
  };

  return { isShowModal, handleToggleModal };
};
