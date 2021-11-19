import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useRedirect(current: string, next: string) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === current) history.replace(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, location]);
}

export default useRedirect;
