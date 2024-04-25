'use client';
import { PropsWithChildren } from 'react';
import reactDom from 'react-dom';

const ModalPortal = ({ children }: PropsWithChildren) => {
  if (typeof window === 'undefined') {
    return;
  }
  const el = document.getElementById('portal');
  if (el) {
    return reactDom.createPortal(children, el);
  } else {
    throw new Error('Modal portal container를 찾지 못했습니다.');
  }
};

export default ModalPortal;
