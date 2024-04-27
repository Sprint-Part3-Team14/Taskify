'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import reactDom from 'react-dom';

const ModalPortal = ({ children }: PropsWithChildren) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById('portal'));
  }, []);

  if (!element) {
    return <></>;
  }

  return reactDom.createPortal(children, element);
};

export default ModalPortal;
