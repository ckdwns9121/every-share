import { useEffect } from 'react';
import { RoutePaths } from '../core/utils/path';
import { useLocation } from 'react-router-dom';

const useMessage = () => {
  const location = useLocation();

  const emptyMessage = (): string => {
    if (location.pathname.indexOf(RoutePaths.main.realty.enrollment) !== -1) {
      return '등록한 매물이 없습니다.';
    } else if (location.pathname.indexOf(RoutePaths.main.realty.like) !== -1) {
      return '찜한 매물이 없습니다.';
    } else if (
      location.pathname.indexOf(RoutePaths.main.realty.enrollment) !== -1
    ) {
      return '문의한 매물이 없습니다.';
    }
    return '';
  };

  useEffect(() => {
    emptyMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return emptyMessage;
};

export default useMessage;
