import { useEffect } from 'react';

export const useEffectOnce = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
