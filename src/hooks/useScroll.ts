import { useLocation } from 'react-router';
import { useState, useEffect, useMemo } from 'react';

export const useUrl = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('/');
  const [prev, setPrev] = useState('');

  useEffect(() => {
    setCurrent(location.pathname + location.search);
    setPrev(current);
    const obj = {
      current: location.pathname + location.search,
      prev: current,
    };
    sessionStorage.setItem('url', JSON.stringify(obj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return { prev, current };
};

export const useScroll = (page: string) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [prevScroll, setPrevScroll] = useState(0);
  const isScrollEnd = useMemo(
    () => scrollHeight !== 0 && scrollHeight - innerHeight - scrollTop < 1,
    [scrollHeight, innerHeight, scrollTop]
  );

  const onScroll = () => {
    setInnerHeight(window.innerHeight);
    setScrollHeight(document.body.scrollHeight);
    setPrevScroll(scrollTop);
    const top =
      window.scrollY ||
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    setScrollTop(top);
    console.log(top);
    sessionStorage.setItem(page, top.toString());
  };

  //윈도우 스크롤 이벤트 추가
  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    scrollTop,
    scrollHeight,
    innerHeight,
    prevScroll,
    isScrollEnd,
  };
};

export const usePostion = (pos: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scrollTop, prevScroll } = useScroll('prev');

  useEffect(() => {
    setTimeout(() => {
      const last = sessionStorage.getItem('last_pos');
      if (last) window.scrollTo(0, parseInt(last));
    }, 100);
    return () => sessionStorage.removeItem('last_pos');
  }, []);
};
