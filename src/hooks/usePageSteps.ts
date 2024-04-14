import { useRef } from 'react';

export const usePageSteps = (pageRef: React.RefObject<HTMLDivElement>) => {
  const index = useRef<number>(0);

  const onClickPrev = () => {
    if (pageRef.current === null || index.current === 0) {
      return;
    }
    const pagesNum = pageRef.current.children.length;
    if (pagesNum < 2) {
      return;
    }
    index.current--;
    pageRef.current.style.transition = 'transform 0.5s ease-in-out';
    pageRef.current.style.transform = `translateX(-${index.current * 100}%)`;
  };

  const onClickNext = () => {
    if (pageRef.current === null) {
      return;
    }
    const pagesNum = pageRef.current.children.length;
    if (index.current === pagesNum - 1 || pagesNum < 2) {
      return;
    }
    index.current++;
    pageRef.current.style.transition = 'transform 0.5s ease-in-out';
    pageRef.current.style.transform = `translateX(-${index.current * 100}%)`;
  };

  const appbarActions = [
    { iconName: 'arrow_back', onClick: onClickPrev },
    { iconName: 'arrow_forward', onClick: onClickNext },
  ];

  return {
    onClickNext,
    onClickPrev,
    appbarActions,
  };
};
